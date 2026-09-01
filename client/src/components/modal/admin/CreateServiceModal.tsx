import { useState } from "react";
import ConfigurationFields from "../../admin/ConfigurationFields";


interface ModalProp {
    close: () => void;
}

type ConfigurationType = "text" | "select" | "checkbox" | "radio" | "number";
type ConfigurationOptions = { option: string }
type Configuration = {
    key: string,
    label: string,
    type?: ConfigurationType,   
    options: ConfigurationOptions[]
}

function CreateServiceModal ({
    close 
}: ModalProp) {
    

    const [isStatusSelected, setIsStatusSelected] = useState<string>('inactive');


    const [newConfig, setNewConfig] = useState<Configuration>({
        key: '',
        label: '',
        options: []
    });
    const [isConfigFieldOpen, setIsConfigFieldOpen] = useState<boolean>(false);
    const [configs, setConfigs] = useState<Configuration[]>([])




    return (
        <div className='fade-up flex flex-col w-[1000px] bg-[#fff] rounded-[15px] p-[2rem] gap-[1.5rem]'>
            <span className="text-[24px] font-bold text-[#292929]">Create Service</span>

            <div className="flex flex-col w-full gap-[1rem] min-h-[500px] max-h-[600px] overflow-y-auto thin-scrollbar">
                
                <div className="flex items-center w-full gap-[0.5rem]">
                    <div className="flex flex-col w-full gap-[0.5rem]">
                        <span className="text-[14px] font-bold text-[#292929]">Name</span>
                        <input type="text" name="" id="" className="text-[16px] font-bold p-[0.5rem] w-full border border-[#292929] rounded-[5px]"/>
                    </div> 

                    <div className="flex flex-col w-full gap-[0.5rem]">
                        <span className="text-[14px] font-bold text-[#292929]">Base Price (Php)</span>
                        <input type="text" name="" id="" className="text-[16px] font-bold p-[0.5rem] w-full border border-[#292929] rounded-[5px]"/>
                    </div>   
                </div>

                <div className="flex flex-col w-full gap-[0.5rem]">
                    <span className="text-[14px] font-bold text-[#292929]">Description</span>
                    <textarea name="" id="" rows={3} className="p-[0.5rem] font-bold border border-[#292929] rounded-[5px]"></textarea>
                </div>  

                {/* insert fields for configuration */}
                <div className="flex flex-col w-full border border-dashed border-[#ff6b00] p-[1rem] rounded-[15px] gap-[0.5rem]">
                    <div className="flex items-center gap-[0.5rem]">
                        <span className="text-[14px] font-bold text-[#292929]">Configuration</span>
                        <button onClick={()=>setIsConfigFieldOpen(true)} className="bg-[#ff6b00] active:bg-[#cc4c02] py-[0.2rem] rounded-[5px] cursor-pointer transition-all duration-100">
                            <span className="text-[14px] text-[#fff] px-[0.5rem] font-bold leading-none">+ Add</span>
                        </button>
                    </div>

                    {configs.map(config => (
                        <>
                            <span>{config.key}</span>
                            <span>{config.label}</span>
                            <span>{config.type}</span>
                            <span>{config.options.map(opt => (
                                <span>{opt.option}</span>
                            ))}</span>
                        </>
                    ))}

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


                <div className="flex items-center w-full gap-[0.5rem]">
                    <span className="text-[14px] font-bold text-[#292929]">Select status</span>
                    <div className="flex items-center p-[0.3rem] bg-[#B1B2B5]/25 rounded-[10px]">
                        <input type="radio" name="status" id="status_active" checked={isStatusSelected === 'active'} value={'active'} onChange={(e)=>setIsStatusSelected(e.target.value)} hidden/>
                        <input type="radio" name="status" id="status_inactive" checked={isStatusSelected === 'inactive'} value={'inactive'} onChange={(e)=>setIsStatusSelected(e.target.value)} hidden/>

                        <label htmlFor="status_active" className={`cursor-pointer py-[0.3rem] px-[0.5rem] ${isStatusSelected === 'active' && 'bg-[#32CD32] text-[#fff]'} font-bold rounded-[5px]`}>Active</label>
                        <label htmlFor="status_inactive" className={`cursor-pointer py-[0.3rem] px-[0.5rem] ${isStatusSelected === 'inactive' && 'bg-[#6D8196] text-[#fff]'} font-bold rounded-[5px]`}>Inactive</label>
                    </div>
                </div>  
                
            </div>

            <div className="flex items-center justify-end w-full gap-[0.3rem]">
                <button className="font-bold text-[#fff] p-[0.5rem] rounded-[10px] px-[1rem] bg-[#ff6b00] cursor-pointer">Create</button>
                <button onClick={close} className="font-bold p-[0.5rem] rounded-[10px] px-[1rem] bg-[#B1B2B5]/25 cursor-pointer">Cancel</button>
            </div>
        </div>
    )
}

export default CreateServiceModal;