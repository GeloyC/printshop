import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";


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
import ConfigurationFields from "../../../components/modal/admin/ConfigurationFields";


// utils
import { deleteService, updateService } from "../../../api/service";
import AdminToast from "../../../components/ui/ToastAdmin";

type SelectedServiceFormProp = {
    service: SelectedServiceType
}

function SelectedServiceForm ({ service }: SelectedServiceFormProp) {

    const location = useLocation();
    const {slug} = useParams();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [newThumbnail, setNewThumbnail] = useState<File|null>(null);
    const [basicInformation, setBasicInformation] = useState<BasicInformationType>({
        name: service.name,
        description: service.description,
        base_price: String(service.base_price)
    })

    const parsedFileRequirements = JSON.parse(String(service.file_requirements));
    const [acceptedFiles, setAcceptedFiles] = useState<fileRequirement[]>(parsedFileRequirements);

    console.log('parsed: ', parsedFileRequirements);
    console.log('accepted: ', acceptedFiles);


    // todo: populate the configs with actual data from db
    const [configs, setConfigs] = useState<Configuration[]>(() => JSON.parse(service.configuration));

    const [newConfig, setNewConfig] = useState<Configuration>({
        id: crypto.randomUUID(),
        key: '',
        label: '',
        options: []
    });

    const [selectedConfigEdit, setSelectedConfigEdit] = useState<Configuration>({
        id: crypto.randomUUID(),
        key: '',
        label: '',
        options: []
    });

    const [isConfigEditModalOpen, setIsConfigEditModalOpen] = useState<boolean>(false);
    const [isAddConfigModalOpen, setIsAddConfigModalOpen] = useState<boolean>(false);

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();


    const closeConfigModal = () => {
        setIsAddConfigModalOpen(false);
        setNewConfig({
            id: "",
            key: '',
            label: '',
            options: []
        })
    };


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

    
    const serviceNameUpdated = service.name !== basicInformation.name;
    const serviceDescriptionUpdated = service.description !== basicInformation.description;
    const serviceBasePriceUpdated = String(service.base_price) !== basicInformation.base_price;

    const fileRequirementUpdated =
        parsedFileRequirements.length !== acceptedFiles.length ||
        !parsedFileRequirements.every((item: { extension: string }) =>
            acceptedFiles.some(
                accepted => accepted.extension === item.extension
            )
        );

    const serviceThumbnailUpdated = newThumbnail !== null;

    const isEqual = (a: unknown, b: unknown) => {
        return JSON.stringify(a) === JSON.stringify(b);
    };
    const serviceConfigUpdated = !isEqual(JSON.parse(service.configuration), configs);
    const serviceSlugUpdated = service.name.split(' ').join('_') !== basicInformation.name.split(' ').join('_');

    const hasChanges = 
        serviceNameUpdated ||
        serviceDescriptionUpdated ||
        serviceBasePriceUpdated ||
        fileRequirementUpdated || 
        serviceThumbnailUpdated ||
        serviceConfigUpdated || 
        serviceSlugUpdated;
        ;
    const handleUpdateService = useMutation({
        mutationFn: async () => {
            const formData = new FormData();


            if (serviceNameUpdated && basicInformation.name !== null) {
                formData.append('name', basicInformation.name);
            }

            if (serviceDescriptionUpdated && basicInformation.description !== null) {
                formData.append('description', basicInformation.description);
            }

            if (serviceBasePriceUpdated && basicInformation.base_price !== String(0)) {
                formData.append('base_price', basicInformation.base_price);
            }

            if (fileRequirementUpdated && acceptedFiles.length !== 0) {
                formData.append('file_requirements', JSON.stringify(acceptedFiles))
            }

            if (serviceThumbnailUpdated) {
                formData.append('thumbnail_file', newThumbnail);
            }

            if (serviceConfigUpdated && configs.length !== 0) {
                formData.append('configuration', JSON.stringify(configs));
            }

            if (basicInformation.name !== null && serviceSlugUpdated) {
                formData.append('slug', basicInformation.name.split(' ').join('_'));
            }
            
            return await updateService(formData, service.id);
        }, 
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['services'] });

            setIsEditing(false);
            navigate(`/admin/service/${basicInformation.name.split(' ').join('_')}`, {
                state: {
                    message: 'Service updated successfully!'
                }
            });
            console.log('service updated');


        }, onError: (err: unknown) => {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 409) {
                    console.log('error message:', err.response.data.message);
                    return;
                }
                const errors = err.response?.data?.errors;
                if (errors) {
                    const allErrors = Object.values(errors).flat();
                    const combinedErrors = allErrors.join(' ');

                    setError(combinedErrors)
                }
                
                console.log(err.response?.data);
            } else {
                console.log('Unexpected error:', err);
            }
            throw err;
        }
    });


    const handleCancelEdit = () => {

        // add the original state for thumbnail later

        setBasicInformation({
            name: service.name,
            description: service.description,
            base_price: String(service.base_price)
        });

        setAcceptedFiles(parsedFileRequirements);
        setConfigs((() => JSON.parse(service.configuration)));
    }

    const message = location.state?.message;
    const dismissToast = () => {
        setTimeout(() => {
            navigate(location.pathname, {
                replace: true,
                state: null
            })
        }, 1500)
    };

    if (location.state?.message) {
        dismissToast();
    }


    return (
        <>
            <main className="flex flex-col w-full h-full bg-[#fff]">
                <div className="flex items-center justify-between w-full p-[1rem] border-b border-[#292929]/10">
                    <div className="flex items-center w-full gap-[0.5rem]">
                        <ReturnButton/>
                        <span className="text-[20px] font-bold leading-none text-[#292929]">{service?.name}</span>

                        {isEditing && (
                            <span className="text-[14px] font-bold opacity-50">Currently editing</span>
                        )}
                    </div>


                    <div className="flex items-center gap-[0.3rem]">

                        {!isEditing ? (
                            <>
                                <button onClick={()=>setDeleteModalOpen(true)} className="flex items-center gap-[0.3rem] p-[0.5rem] px-[1rem] cursor-pointer opacity-50 bg-[#ff0f0f] hover:opacity-100 hover:bg-[#e50000] active:bg-[#ff0f0f] rounded-[5px] transition-all duration-200">
                                    <span className="text-[14px] text-[#fff] font-bold leading-none">Delete</span>
                                </button>

                                <button onClick={()=>setIsEditing(true)} className="flex items-center gap-[0.3rem] bg-[#008000] hover:bg-[#0F4D0F] active:bg-[#008000] p-[0.5rem] px-[1rem] rounded-[5px] cursor-pointer transition-all duration-200">
                                    <span className="text-[14px] text-[#fff] font-bold leading-none text-nowrap">Edit details</span>
                                </button>
                            </>
                        ):(
                            <>
                                <button onClick={()=>handleUpdateService.mutate()} 
                                disabled={!hasChanges}
                                className={`flex items-center gap-[0.3rem] bg-[#008000] p-[0.5rem] px-[1rem] rounded-[5px] transition-all duration-200 ${!hasChanges ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0F4D0F] active:bg-[#008000] cursor-pointer'}`}>
                                    <span className="text-[14px] text-[#fff] font-bold leading-none text-nowrap">Save Changes</span>
                                </button>

                                <button onClick={()=>{
                                    setIsEditing(false)
                                    handleCancelEdit()
                                }} className="flex bg-[#f2f2f2] hover:bg-[#B1B2B5]/50 active:bg-[#f2f2f2] p-[0.5rem] px-[1rem] cursor-pointer rounded-[5px] transition-all duration-200">
                                    <span className="text-[14px] text-[#292929] font-bold leading-none text-nowrap">Cancel</span>
                                </button>
                            </>
                        )}

                    </div>
                </div>

                <div className="flex flex-col items-center w-full h-[675px] overflow-y-auto thin-scrollbar">
                    <SelectedServiceThumbnail 
                        currentImage={service.thumbnail_url}
                        setNewThumbnail={setNewThumbnail}
                        isEditing={isEditing}
                    />

                    <section className="flex flex-col w-[700px] p-[1rem] gap-[2rem]">
                        <SelectedServiceBasicInformation 
                            basicInformation={basicInformation}
                            setBasicInformation={setBasicInformation}
                            isEditing={isEditing}
                        />

                        <SSFileRequirement 
                            acceptedFiles={acceptedFiles}
                            setAcceptedFiles={setAcceptedFiles}
                            isEditing={isEditing}
                        />

                        <SSConfiguration 
                            configs={configs}
                            setConfigs={setConfigs}
                            setSelectedConfigEdit={setSelectedConfigEdit}
                            openEditConfigModal={()=>setIsConfigEditModalOpen(true)}
                            openAddConfigModal={()=>setIsAddConfigModalOpen(true)}
                            isEditing={isEditing}
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

            {isAddConfigModalOpen && (
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

            {message && (
                <AdminToast 
                    message={message}
                    color='#CCFFCC'
                />
            )}

            {error && (
                <AdminToast 
                    message={error}
                    color='#CCFFCC'
                />
            )}
        </>
    )
}

export default SelectedServiceForm;