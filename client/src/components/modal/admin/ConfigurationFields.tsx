import { useEffect, useState, type SetStateAction } from "react";


// types
import type { Configuration, ConfigurationOptions, ConfigurationType } from "./CreateServiceModal";

interface ConfigurationProps {
    setNewConfig: React.Dispatch<SetStateAction<Configuration>>
    setConfigs: React.Dispatch<SetStateAction<Configuration[]>>
    newConfig: Configuration
    configs: Configuration[]
    closeFields: ()=>void;
}


function ConfigurationFields ({
    setNewConfig,
    setConfigs,
    newConfig,
    configs,
    closeFields
}: ConfigurationProps) {

    const [isOptionFieldOpen, setIsOptionFieldOpen] = useState<boolean>(false);
    const [newOption, setNewOption] = useState<string>('')
    const [options, setOptions] = useState<ConfigurationOptions[]>([]);

    const handleAddOptions = (value: ConfigurationOptions) => {
        setOptions((opt) => [...opt, value]);
        
        setNewOption('');
        setIsOptionFieldOpen(false);
    }

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewConfig(con => ({
            ...con,
            key: e.target.value
        }))
    }

    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setNewConfig(con => ({
            ...con,
            label: e.target.value
        }));
    }

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        setNewConfig(con => ({
            ...con,
            type: e.target.value as ConfigurationType
        }));
    }

    const handleAddNewConfig = (value: Configuration) => {
        setConfigs(config => [...config, value]);
        closeFields();
    }

    useEffect(()=> {
        console.log('Configs: ', configs);
    }, []);

    return (
        <div className="flex flex-col items-center w-full gap-[0.5rem] p-[0.75rem] border border-dashed border-[#ff6b00] bg-[#ffdca5] rounded-[10px]">
            <div className="grid grid-cols-3 w-full gap-[0.5rem]">
                <div className="flex flex-col w-full">
                    <span className="text-[14px] font-bold">Key</span>
                    <input type="text" name="key" id="service_key" value={newConfig.key} onChange={handleKeyChange}
                    className="p-[0.5rem] text-[#292929] font-bold border border-[#292929]/50 bg-[#fff] rounded-[5px]"/>
                </div>

                <div className="flex flex-col w-full">
                    <span className="text-[14px] font-bold">Label</span>
                    <input type="text" name="label" id="service_label" value={newConfig.label} onChange={handleLabelChange}
                    className="p-[0.5rem] text-[#292929] font-bold border border-[#292929]/50 bg-[#fff] rounded-[5px]"/>
                </div>

                <div className="flex flex-col w-full">
                    <span className="text-[14px] font-bold">Type</span>
                    <select name="type" id="type" value={newConfig.type} onChange={handleTypeChange}
                    className="p-[0.5rem] text-[#292929] font-bold border border-[#292929]/50 bg-[#fff] rounded-[5px]">
                        <option value="select">Dropdown Selection</option>
                        <option value="text">Text Field</option>
                        <option value="number">Number Field</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col w-full border border-dashed border-[#cc4c02] p-[0.5rem] gap-[0.5rem] rounded-[5px]">
                <div className="flex items-center gap-[0.5rem]">
                    <span className="text-[14px] font-bold">Options</span>
                    <button onClick={()=>setIsOptionFieldOpen(true)} className="bg-[#ff6b00] active:bg-[#cc4c02] py-[0.2rem] rounded-[5px] cursor-pointer transition-all duration-100">
                        <span className="text-[14px] text-[#fff] px-[0.5rem] font-bold leading-none">+ Add</span>
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-[0.2rem] w-full">
                    {options.map(opt => (
                        <span className="bg-[#fff] text-[14px] font-bold p-[0.3rem] px-[0.5rem] rounded-[5px] border border-[#292929]/75">{opt.option}</span>
                    ))}

                    {isOptionFieldOpen && (
                        <div className="flex items-center gap-[0.3rem]">
                            <input type="text" name="option" id="option_new" value={newOption} onChange={(e)=>setNewOption(e.target.value)}
                            className="bg-[#fff] text-[14px] font-bold p-[0.3rem] rounded-[5px] border border-[#292929]/75"/>
                            <button onClick={()=>handleAddOptions({ option: newOption })} className="bg-[#292929] border border-[#292929] rounded-[5px] text-[#fff] text-[14px] p-[0.5rem] leading-none">Save</button>
                            <button onClick={()=>setIsOptionFieldOpen(false)} className="bg-[#404040] border border-[#292929] rounded-[5px] text-[#fff] text-[14px] p-[0.5rem] leading-none">Cancel</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex w-full items-center justify-end gap-[0.2rem]">
                <button onClick={() => handleAddNewConfig({
                    id: newConfig.id,
                    key: newConfig.key,
                    label: newConfig.label,
                    type: newConfig.type,
                    options: options
                })} className="bg-[#292929] p-[0.5rem] px-[1rem] text-[#fff] rounded-[5px] cursor-pointer">Save</button>
                <button onClick={closeFields} className="bg-transparent p-[0.5rem] px-[1rem] text-[#292929] font-bold rounded-[5px] cursor-pointer">Cancel</button>
            </div>
        </div>
    )
}

export default ConfigurationFields