import { useEffect, useState, useCallback } from "react";
import { useParams, useBlocker, useNavigate } from "react-router-dom";
import type { BlockerFunction } from 'react-router-dom';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DisplayFiles from "./DisplayFiles"
import ModalWrapper from "../../../components/wrapper/ModalWrapper";
import ConfigurationSetupModal from "../../../components/modal/client/ConfigurationSetupModal";
import Toast from "../../../components/ui/Toast";

import type { fileItem } from "../../../types/FileType";
import RedirectAlert from "../../../components/ui/RedirectAlert";
import type { Configuration } from "../../../types/service/service";
import { useCartContext } from "../../../context/cartContext";
import { AddItemToCart } from "../../../api/orderItem";
import { useUserContext } from "../../../context/userContext";


type fileRequirement = {
    extension: string
}

type ServiceType = {
    id: string,
    name: string,
    description: string,
    file_requirements: fileRequirement[],
}

type fileConfigType = {
    id: string,
    configuration: Configuration[],
    slug: string
}

type ServiceClientFormProp = {
    service: ServiceType
    configurations: fileConfigType
}

function ServiceClientForm ({ service, configurations }: ServiceClientFormProp) {

    const { setItems } = useCartContext();
    const { user } = useUserContext(); 

    const { slug } = useParams();   
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState<fileItem|null>(null);
    const [files, setFiles] = useState<fileItem[]>([]);
    const [error, setError] = useState<string>('');

    const [fileSetupModalOpen, setFileSetupModalOpen] = useState<boolean>(false);
    

    const requiredFiles = service?.file_requirements.map(
        (req: { extension: string }) => req.extension
    ) ?? [];


    const hasCurrentServiceFiles = files.some(file => file.slug === slug); 
    const checkFile = files.map(file => (file.configuration?.length ?? 0) > 0);
    const checkFileAllTrue = checkFile.every(file => file === true)

    const shouldBlock = checkFileAllTrue && hasCurrentServiceFiles; 

    const shouldBlockNavigation = useCallback<BlockerFunction> (
        ({ currentLocation, nextLocation }) =>
            currentLocation.pathname.startsWith('/service/') &&
            !shouldBlock &&
            files.length > 0 &&
            currentLocation.pathname !== nextLocation.pathname,
            
        [shouldBlock, files.length]
    );
    
    const blocker = useBlocker(shouldBlockNavigation);

    const proceedToCheckOut = () => {
        if (shouldBlock) {
            setItems(items=>[...files, ...items]);
            setFiles([]);
        }
        navigate('/cart');
    } 

    const queryClient = useQueryClient();
    const handleAddToCart = useMutation({
        mutationFn: async () => {
            const responses = [];

            for (const file of files) {
                const formData = new FormData();

                formData.append('configuration', JSON.stringify(file.configuration));
                formData.append('file', file.file);

                if (file.additional_instruction) {
                    formData.append('additional_instruction', file.additional_instruction);
                }
                
                formData.append('slug', file.slug);
                formData.append('service_slug', file.slug);
                formData.append('quantity', String(file.quantity));
                formData.append('unit_price', String(file.unit_price));
                formData.append('total_price', String(file.total_price));

                responses.push(await AddItemToCart(formData, user.id));
            }

            return responses;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey:['cart-items'] })

            proceedToCheckOut();
        },
        onError: (err: unknown) => {
            if (axios.isAxiosError(err)) {
                console.error('Status:', err.response?.status);
                console.error('Response:', err.response?.data);
            } else {
                console.error('Unexpected error:', err);
            }
        }
    });


    


    return (
        <>
            <div className={`flex flex-1 w-full ${!files.length ? 'items-stretch p-[rem]' : 'bg-[#ffdca5] border-4 border-[#ffc36d]'} rounded-t-[15px] overflow-hidden  gap-[2rem] `}>
                
                <DisplayFiles 
                    setSelectedFile={setSelectedFile}
                    requiredFiles={requiredFiles}
                    setFiles={setFiles}
                    files={files}
                    setError={setError}
                    slug={String(slug)}
                    handleAddToCart={handleAddToCart}
                    setFileSetupModalOpen={setFileSetupModalOpen}
                    serviceName={service?.name}
                    serviceDescription={service?.description}
                    shouldBlock={shouldBlock}
                />

                {error && <Toast message={error} />}
            </div>

            {fileSetupModalOpen && (
                <ModalWrapper>
                    <ConfigurationSetupModal 
                        selectedFile={selectedFile}
                        setFiles={setFiles}
                        setSelectedFile={setSelectedFile}
                        closeModal={()=>setFileSetupModalOpen(false)}
                        configurations={configurations}
                        setFileSetupModalOpen={setFileSetupModalOpen}
                    />
                </ModalWrapper>
            )}

            {blocker.state === 'blocked' &&  (
                <ModalWrapper>
                    <RedirectAlert 
                        stayPage={() => blocker.reset()}
                        leavePage={() =>  {
                            setFiles(prev => prev.filter(file => file.slug !== slug));
                            blocker.proceed()
                        }}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default ServiceClientForm;