import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// icon
import DeleteIcon from '/src/assets/icon/delete_v2.svg?react';

// types
import type { 
    BasicInformationType, 
    Configuration, 
    SelectedServiceType,
    fileRequirement
} from "../../../types/service/service";

// components
import SelectedServiceBasicInformation from "./SelectedServiceBasicInformation";
import SelectedServiceThumbnail from "./SelectedServiceThumbnail";
import SSConfiguration from "./SSConfiguration";
import ReturnButton from "../../../components/ui/ReturnButton";
import ModalWrapper from "../../../components/wrapper/ModalWrapper";
import ConfigurationEditModal from "../../../components/modal/admin/ConfigurationEditModal";
import SSFileRequirement from "./SSFileRequirement";
import DeleteServiceAlert from "../../../components/modal/admin/DeleteServiceAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";


// utils
import { deleteService } from "../../../api/service";

type SelectedServiceFormProp = {
    service: SelectedServiceType
}

function SelectedServiceForm ({ service }: SelectedServiceFormProp) {


    const [basicInformation, setBasicInformation] = useState<BasicInformationType>({
        name: service.name,
        description: service.description,
        base_price: String(service.base_price)
    })

    const parsedFileRequirements = JSON.parse(String(service.file_requirements));
    const [acceptedFiles, setAcceptedFiles] = useState<fileRequirement[]>(parsedFileRequirements);

    // todo: populate the configs with actual data from db
    const [configs, setConfigs] = useState<Configuration[]>(() => JSON.parse(service.configuration));

    const [selectedConfigEdit, setSelectedConfigEdit] = useState<Configuration>({
        id: crypto.randomUUID(),
        key: '',
        label: '',
        options: []
    });

    const [isConfigEditModalOpen, setIsConfigEditModalOpen] = useState<boolean>(false);


    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const handleDeleteService = useMutation({
        mutationFn: async (id: string) => {
            return await deleteService(id)
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
            setDeleteModalOpen(false);

            
            navigate('/admin/service', {
                state: {
                    message: `${service.name} deleted successfully`
                }
            });
        }, onError: (err: unknown) => {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 409) {
                    console.log('error message:', err.response.data.message);
                    return;
                }

                console.log(err.response?.data);
            } else {
                console.log('Unexpected error:', err);
            }
            throw err;
        }
    });

    return (
        <>
            <main className="flex flex-col w-full h-full bg-[#fff]">
                <div className="flex items-center justify-between w-full p-[1rem] border-b border-[#292929]/10">
                    <div className="flex items-center w-full gap-[0.5rem]">
                        <ReturnButton/>
                        <span className="text-[20px] font-bold leading-none text-[#292929]">{service?.name}</span>
                    </div>


                    <div className="flex items-center gap-[0.5rem]">

                        <button onClick={()=>setDeleteModalOpen(true)} className="flex items-center gap-[0.3rem] p-[0.5rem] px-[1rem] cursor-pointer bg-[#ff0f0f] hover:bg-[#e50000] active:bg-[#ff0f0f] rounded-[5px] transition-all duration-200">
                            <DeleteIcon className="size-4" color="#fff" />
                            <span className="text-[14px] text-[#fff] font-bold leading-none">Delete</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center w-full h-[675px] overflow-y-auto thin-scrollbar">
                    <SelectedServiceThumbnail 
                        currentImage={service.thumbnail_url}
                    />

                    <section className="flex flex-col w-[700px] p-[1rem] gap-[2rem]">
                        <SelectedServiceBasicInformation 
                            basicInformation={basicInformation}
                            setBasicInformation={setBasicInformation}
                        />

                        <SSFileRequirement 
                            acceptedFiles={acceptedFiles}
                            setAcceptedFiles={setAcceptedFiles}
                        />

                        <SSConfiguration 
                            configs={configs}
                            setConfigs={setConfigs}
                            setSelectedConfigEdit={setSelectedConfigEdit}
                            openEditModal={()=>setIsConfigEditModalOpen(true)}
                        />
                    </section>
                </div>
            </main>

            {isConfigEditModalOpen && (
                <ModalWrapper>
                    <ConfigurationEditModal 
                        selectedConfig={selectedConfigEdit}
                        close={()=>setIsConfigEditModalOpen(false)}
                        setSelectedConfigEdit={setSelectedConfigEdit}
                        setConfigs={setConfigs}
                    />
                </ModalWrapper>
            )}

            {deleteModalOpen && (
                <ModalWrapper>
                    <DeleteServiceAlert 
                        close={()=>setDeleteModalOpen(false)}
                        deleteService={()=>handleDeleteService.mutate(service.id)}
                        deletePending={handleDeleteService.isPending}
                        name={service.name}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default SelectedServiceForm;