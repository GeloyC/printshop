import { useState } from "react";

// icon
import Save from '/src/assets/icon/save.svg?react'


// component
import ConfigurationFields from "../../components/modal/admin/ConfigurationFields";
import ModalWrapper from "../../components/wrapper/ModalWrapper";
import ConfigurationEditModal from "../../components/modal/admin/ConfigurationEditModal";
import BasicInformation from "../../components/admin/CreateService/BasicInformation";
import ConfigurationComp from "../../components/admin/CreateService/ConfigurationComp";
import ThumbnailComp from "../../components/admin/CreateService/ThumbnailComp";

export type ConfigurationType = "text" | "select" | "checkbox" | "radio" | "number";
export type ConfigurationOptions = { id: string, option: string, price: number }
export type Configuration = {
    id: string,
    key: string,
    label: string,
    type?: ConfigurationType | null,   
    options: ConfigurationOptions[]
}

function CreateService () {


    
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
    const [isConfigEditModalOpen, setIsConfigEditModalIsOpen] = useState<boolean>(false);


    const closeConfigModal = () => {
        setIsConfigFieldOpen(false);
        setNewConfig({
            id: "",
            key: '',
            label: '',
            options: []
        })
    }

    return (
        <>
            <div className="flex flex-col h-full bg-[#fff]">
                
                <div className="flex items-center justify-between w-full border-b border-[#292929]/10 p-[1rem]">
                    <span className="text-[20px] font-bold text-[#292929]">Create Service</span>

                    <button className="flex items-center gap-[0.3rem] bg-[#ff6b00] hover:bg-[#cc4c02]/90 active:bg-[#ff6b00] min-w-[5rem] py-[0.5rem] px-[1rem] cursor-pointer transition-all duration-100">
                        <span className="text-[#fff] text-[14px] leading-none font-bold">Save</span>
                        <Save className="size-5" fill="#fff"/>
                    </button>
                </div>

                <div className="flex flex-col items-center w-full h-[675px] overflow-y-auto thin-scrollbar gap-[1rem] p-[1rem]">
                    <ThumbnailComp 

                    />

                    <div className="flex flex-col w-[700px] gap-[1.5rem]">
                        <BasicInformation />
                        <ConfigurationComp 
                            isConfigFieldOpen={isConfigFieldOpen}
                            setIsConfigFieldOpen={setIsConfigFieldOpen}
                            configs={configs}
                            setConfigs={setConfigs}
                            setSelectedConfigEdit={setSelectedConfigEdit}
                            openEditModal={()=>setIsConfigEditModalIsOpen(true)}
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
                        close={()=>setIsConfigEditModalIsOpen(false)}
                        setSelectedConfigEdit={setSelectedConfigEdit}
                        setConfigs={setConfigs}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default CreateService;