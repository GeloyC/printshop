import { useState } from "react";

// component
import ConfigurationFields from "../../components/modal/admin/ConfigurationFields";
import ConfigurationItem from "./ConfigurationItem";

export type ConfigurationType = "text" | "select" | "checkbox" | "radio" | "number";
export type ConfigurationOptions = { option: string }
export type Configuration = {
    key: string,
    label: string,
    type?: ConfigurationType,   
    options: ConfigurationOptions[]
}

function CreateService () {

    const [isStatusSelected, setIsStatusSelected] = useState<string>('inactive');

    const [newConfig, setNewConfig] = useState<Configuration>({
        key: '',
        label: '',
        options: []
    });
    const [isConfigFieldOpen, setIsConfigFieldOpen] = useState<boolean>(false);
    const [configs, setConfigs] = useState<Configuration[]>([])

    return (
        <div className="flex flex-col w-full h-full bg-[#fff] rounded-t-[15px] p-[2rem] gap-[1rem] border border-[#404040]/25">
            
            <div className="flex items-center w-full border-b border-[#292929]/10 pb-[0.5rem]">
                <span className="text-[20px] font-bold text-[#292929]">Create Service</span>
            </div>

            <div className="grid grid-cols-[2fr_5fr] w-full h-full gap-[1rem]">

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

                    <div className="flex flex-col gap-[0.2rem] w-[500px]">
                        <span className="text-[16px] text-[#292929] font-bold">Configuration</span>
                        <p className="text-[14px] opacity-75">Add a short description or instruction here about the configuration</p>
                    </div>

                    {configs.map(config=>(
                        <ConfigurationItem 
                            config={config}
                        />
                    ))}
                    
                    <div className="flex flex-col gap-[0.5rem] w-[700px] border border-dashed border-[#292929]/25 p-[0.5rem] rounded-[10px]">

                        {!isConfigFieldOpen && (
                            <button onClick={()=>setIsConfigFieldOpen(true)} className="bg-[#292929] hover:bg-[#404040] active:bg-[#292929] w-full py-[0.5rem] rounded-[5px] cursor-pointer">
                                <span className="text-[#fff]">+ Add configuration</span>
                            </button>
                        )}

                        {isConfigFieldOpen && (
                            <ConfigurationFields 
                                setNewConfig={setNewConfig}
                                newConfig={newConfig}
                                setConfigs={setConfigs}
                                configs={configs}
                                closeFields={()=>setIsConfigFieldOpen(false)}
                            />
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateService;