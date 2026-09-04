import { useEffect, useState } from "react";

// component
import ConfigurationFields from "../../components/modal/admin/ConfigurationFields";
import ConfigurationItem from "./ConfigurationItem";
import ModalWrapper from "../../components/wrapper/ModalWrapper";
import ConfigurationEditModal from "../../components/modal/admin/ConfigurationEditModal";

export type ConfigurationType = "text" | "select" | "checkbox" | "radio" | "number";
export type ConfigurationOptions = { option: string, price: number }
export type Configuration = {
    id: string,
    key: string,
    label: string,
    type?: ConfigurationType | null,   
    options: ConfigurationOptions[]
}

function CreateService () {

    // const [isStatusSelected, setIsStatusSelected] = useState<string>('inactive'); 

    const [newConfig, setNewConfig] = useState<Configuration>({
        id: crypto.randomUUID(),
        key: '',
        label: '',
        options: []
    });
    const [isConfigFieldOpen, setIsConfigFieldOpen] = useState<boolean>(false);
    const [configs, setConfigs] = useState<Configuration[]>([]);

    
    const [isConfigEditModalOpen, setIsConfigEditModalIsOpen] = useState<boolean>(false);
    const [selectedConfigEdit, setSelectedConfigEdit] = useState<Configuration>({
        id: crypto.randomUUID(),
        key: '',
        label: '',
        options: []
    });

    const handleDeleteConfig = (id: string) => {
        setConfigs(config => config.filter(item => item.id !== id));
    }

    const selectConfigToEdit = (id: string) => {
        const selected = configs.find(item => item.id === id);

        if (!selected) return;
        setSelectedConfigEdit(selected)
        setIsConfigEditModalIsOpen(true);
    }

    useEffect(() => {
        console.log('updated: ', selectedConfigEdit);
    }, [])



    return (
        <div className="flex flex-col w-full h-full bg-[#fff] rounded-t-[15px] p-[2rem] gap-[1rem] border border-[#404040]/25">
            
            <div className="flex items-center w-full border-b border-[#292929]/10 pb-[0.5rem]">
                <span className="text-[20px] font-bold text-[#292929]">Create Service</span>
            </div>

            <div className="grid grid-cols-[3fr_5fr] w-full h-full gap-[1rem]">

                <div>
                    Thumbnail here
                </div>

                <div className="flex flex-col w-full h-[650px] overflow-y-auto thin-scrollbar gap-[1.5rem]">
                    <span className="text-[16px] text-[#292929] font-bold">Basic Information</span>

                    <div className="flex flex-col gap-[0.5rem] w-[700px]">
                        <div className="flex flex-col items-start w-full">
                            <span className="text-[14px] text-[#292929]/75 font-bold">Name of service</span>
                            <input type="text" name="service_name" id="service_name" 
                            className="w-full p-[0.5rem] text-[14px] font-bold border border-[#292929]/25 bg-[#f2f2f2] rounded-[10px] focus:outline-[#ff6b00]" />
                        </div>

                        <div className="flex flex-col items-start w-full">
                            <span className="text-[14px] text-[#292929]/75 font-bold">Description</span>
                            <textarea name="service_description" id="service_description" rows={4}
                            className="w-full p-[0.5rem] text-[14px] font-bold border border-[#292929]/25 bg-[#f2f2f2] rounded-[10px] focus:outline-[#ff6b00]" />
                        </div>

                        <div className="flex flex-col items-start w-full">
                            <span className="text-[14px] text-[#292929]/75 font-bold">Base Price (Php)</span>
                            <input type="text" name="service_base_price" id="service_base_price" 
                            className="w-full p-[0.5rem] text-[14px] font-bold border border-[#292929]/25 bg-[#f2f2f2] rounded-[10px] focus:outline-[#ff6b00]" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-[0.2rem] w-[700px]">

                        <div className="flex items-center justify-between w-full">
                            <span className="text-[16px] text-[#292929] font-bold">Configuration</span> 

                            <button onClick={()=>setIsConfigFieldOpen(true)} className={`bg-[#292929] hover:bg-[#404040] active:bg-[#292929] px-[0.5rem] rounded-[25px]  ${isConfigFieldOpen ? 'opacity-50' : 'cursor-pointer'}`}>
                                <span className="text-[#fff] text-[14px]">+ Add configuration</span>
                            </button>
                        </div>
                        <p className="text-[14px] opacity-75">Add a short description or instruction here about the configuration</p>
                    </div>

                    {configs?.length > 0 && (
                        <div className="flex flex-col w-[700px] gap-[0.5rem]">
                            {configs.map(config=>(
                                <ConfigurationItem key={config.key}
                                    config={config}
                                    handleDeleteConfig={handleDeleteConfig}
                                    selectConfigToEdit={()=>selectConfigToEdit(config.id)}
                                />
                            ))}
                        </div>
                    )}

                    {isConfigFieldOpen && (
                        <ModalWrapper>
                            <ConfigurationFields 
                                setNewConfig={setNewConfig}
                                newConfig={newConfig}
                                setConfigs={setConfigs}
                                configs={configs}
                                closeFields={()=>setIsConfigFieldOpen(false)}
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
                </div>
            </div>
        </div>
    )
}

export default CreateService;