import { useEffect, useState } from "react";
import { useParams, useBlocker, useNavigate } from "react-router-dom";


import DisplayFiles from "./DisplayFiles"
import ModalWrapper from "../../../components/wrapper/ModalWrapper";
import ConfigurationSetupModal from "../../../components/modal/client/ConfigurationSetupModal";
import Toast from "../../../components/ui/Toast";

import type { fileItem } from "../../../types/FileType";
import RedirectAlert from "../../../components/ui/RedirectAlert";
import type { Configuration } from "../../../types/service/service";
import { useCartContext } from "../../../context/cartContext";


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

    const { slug } = useParams();   
    const { setItems } = useCartContext();
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState<fileItem|null>(null);
    const [files, setFiles] = useState<fileItem[]>([]);
    const [error, setError] = useState<string>('');

    const [fileSetupModalOpen, setFileSetupModalOpen] = useState<boolean>(false);
    

    const requiredFiles = service?.file_requirements.map(
        (req: { extension: string }) => req.extension
    ) ?? [];


    // TODO: use useBlocker from react-router to alert user when navigating away from /service/[selected service slug]
    const filesSlugCheckExist = files.some(file => file.slug === slug); // check the slug of files if it's similar to the current service

    const checkFile = files.map(file => (file.configuration?.length ?? 0) > 0);
    const checkFileAllTrue = checkFile.every(file => file === true)

    const shouldBlock = checkFileAllTrue && filesSlugCheckExist; // change later to have configuration under the condition
    
    const blocker = useBlocker(({ currentLocation, nextLocation }) => 
        !shouldBlock && files.length > 0 &&  currentLocation.pathname !== nextLocation.pathname
    );


    const proceedToCheckOut = () => {
        if (shouldBlock) {
            setItems(items=>[...files, ...items]);
            setFiles([]);
        }
        navigate('/cart');
    } 




    return (
        <>
            <div className="relative flex flex-col w-full h-full items-center gap-[1rem] py-[4rem]">
                <div className="flex flex-col w-full items-center gap-[0.5rem]">
                    <span className="text-6xl text-[#292929] font-bold leading-none">{service.name}</span>
                    <p>{service.description}</p>
                </div>

                <DisplayFiles 
                    setSelectedFile={setSelectedFile}
                    requiredFiles={requiredFiles}
                    setFiles={setFiles}
                    files={files}
                    setError={setError}
                    slug={String(slug)}
                    handleCheckoutAttemp={proceedToCheckOut}
                    setFileSetupModalOpen={setFileSetupModalOpen}
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