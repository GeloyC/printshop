import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// icon
import Save from '/src/assets/icon/save.svg?react'


// component
import ConfigurationFields from "../../../components/modal/admin/ConfigurationFields";
import ModalWrapper from "../../../components/wrapper/ModalWrapper";
import ConfigurationEditModal from "../../../components/modal/admin/ConfigurationEditModal";
import CreateServiceBasicInformation from "./CreateServiceBasicInformation";
import CSConfiguration from "./CSConfiguration";
import ThumbnailComp from "./ThumbnailComp";
import ReturnButton from "../../../components/ui/ReturnButton";

import type { 
    BasicInformationType,
    Configuration 
} from "../../../types/service/service";

// service
import { createService } from "../../../api/service";
import CSFileRequirement from "./CSFileRequirement";
import AdminToast from "../../../components/ui/ToastAdmin";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";



// todo
/*
* Creating the service converts the service name to slug ex. Document Print -> document_print
*/

function CreateService () {

    const [thumbnailBlob, setThumbnailBlob] = useState<File|null>(null);
    const [thumbnailPrev, setThumbnailPrev] = useState<string>('')


    const [basicInfo, setBasicInfo] = useState<BasicInformationType>({
        name: '',
        description: '',
        base_price: 0
    })
    
    type extensionType = { extension: string }
    const [acceptedFiles, setAcceptedFiles] = useState<extensionType[]>([]);

    const [newConfig, setNewConfig] = useState<Configuration>({
        id: crypto.randomUUID(),
        key: '',
        label: '',
        options: []
    });

    const [configs, setConfigs] = useState<Configuration[]>([]);
    const [selectedConfigEdit, setSelectedConfigEdit] = useState<Configuration>({
        id: crypto.randomUUID(),
        key: '',
        label: '',
        options: []
    });


    const [isConfigFieldOpen, setIsConfigFieldOpen] = useState<boolean>(false);
    const [isConfigEditModalOpen, setIsConfigEditModalOpen] = useState<boolean>(false);


    const closeConfigModal = () => {
        setIsConfigFieldOpen(false);
        setNewConfig({
            id: "",
            key: '',
            label: '',
            options: []
        })
    };

    type toastType = {
        message: string,
        color?: string
    }
    const [toast, setToast] = useState<toastType>({
        message: '',
        color: '#fff600'
    });

    const queryClient = useQueryClient();
    const handleCreateService = useMutation({
        mutationFn: async () => {
            const ServiceFormData = new FormData();
            ServiceFormData.append('name', basicInfo.name);
            ServiceFormData.append('description', basicInfo.description);
            ServiceFormData.append('base_price', String(basicInfo.base_price));
            ServiceFormData.append('file_requirements', JSON.stringify(acceptedFiles));

            if (thumbnailBlob) {
                ServiceFormData.append('thumbnail_file', thumbnailBlob);
            }

            ServiceFormData.append('configuration', JSON.stringify(configs));
            ServiceFormData.append('slug', basicInfo.name.split(' ').join('_').toLocaleLowerCase());
            
            return createService(ServiceFormData);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['services']});


            setToast({
                message: `${basicInfo.name} successfully created!`,
                color: '#CCFFCC'
            });
            setTimeout(()=>setToast({message: '', color: ''}), 3000);
            

            setThumbnailBlob(null);
            setThumbnailPrev('');
            setBasicInfo({
                name: '',
                description: '',
                base_price: 0
            });
            setAcceptedFiles([]);
            setConfigs([]);
            setNewConfig({
                id: '',
                key: '',
                label: '',
                options: []
            });

        },
        onError: (err: unknown) => {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 409) {
                    console.log('error message:', err.response.data.message);

                    setToast({
                        message: err.response.data.message,
                        color: ' #FF5F15'
                    });
                    setTimeout(()=>setToast({
                        message: '',
                        color: ''
                    }), 3000);

                    return;
                }
                setToast({
                    message: err.response?.data.message,
                    color: ' #FF5F15'
                });
                setTimeout(()=>setToast({
                    message: '',
                    color: ''
                }), 3000);
            } else {
                console.log('Unexpected error:', err);
            }
            throw err;
        }
    });


    return (
        <>
            <div className="flex flex-col w-full h-full bg-[#fff]">
                
                <div className="flex items-center justify-between w-full border-b border-[#292929]/10 p-[1rem]">

                    <div className="flex items-center gap-[0.5rem]">
                        <ReturnButton/>
                        <span className="text-[20px] font-bold text-[#292929]">Create Service</span>
                    </div>

                    <button onClick={()=>handleCreateService.mutate()} className="flex items-center gap-[0.3rem] bg-[#ff6b00] rounded-[5px] hover:bg-[#cc4c02]/90 active:bg-[#ff6b00] min-w-[5rem] py-[0.5rem] px-[1rem] cursor-pointer transition-all duration-100">
                        <span className="text-[#fff] text-[14px] leading-none font-bold">Save</span>
                        {handleCreateService.isPending ? (
                            <LoadingSpinner 
                                size={20}
                                color="#fff"
                            />
                        ):(
                            <Save className="size-5" fill="#fff"/>
                        )}
                    </button>
                </div>

                {handleCreateService.isPending && ( 
                    <div className={`absolute inset-0 flex h-full bg-[#292929]/30 ${handleCreateService.isPending ? 'opacity-100' : 'opacity-0'} z-10 transition-all duration-200`}/>
                )}

                <div className={`flex flex-col items-center w-full h-[675px] overflow-y-auto thin-scrollbar gap-[1rem] p-[1rem]`}>

                    <ThumbnailComp 
                        thumbnailPrev={thumbnailPrev}
                        thumbnailBlob={thumbnailBlob}
                        setThumbnailBlob={setThumbnailBlob}
                        setThumbnailPrev={setThumbnailPrev}
                    />

                    <div className="flex flex-col w-[700px] gap-[1.5rem]">
                        <CreateServiceBasicInformation 
                            basicInfo={basicInfo}
                            setBasicInfo={setBasicInfo}
                        />

                        <CSFileRequirement 
                            acceptedFiles={acceptedFiles}
                            setAcceptedFiles={setAcceptedFiles}
                        />

                        <CSConfiguration 
                            isConfigFieldOpen={isConfigFieldOpen}
                            setIsConfigFieldOpen={setIsConfigFieldOpen}
                            configs={configs}
                            setConfigs={setConfigs}
                            setSelectedConfigEdit={setSelectedConfigEdit}
                            openEditModal={()=>setIsConfigEditModalOpen(true)}
                        />

                    </div>
                </div>

            </div>

            {isConfigFieldOpen && (
                <ModalWrapper>
                    <ConfigurationFields 
                        setNewConfig={setNewConfig}
                        newConfig={newConfig}
                        setConfigs={setConfigs}
                        configs={configs}
                        closeFields={closeConfigModal}
                    />
                </ModalWrapper>
            )}

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

            {toast.message && (
                <AdminToast 
                    message={toast.message}
                    color={toast.color}
                />
            )}
        </>
    )
}

export default CreateService;