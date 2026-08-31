import { useState, type SetStateAction } from "react";

// icons
import Cancel from '/src/assets/icon/close.svg?react'
import Check from '/src/assets/icon/save-check.svg?react'

// types
import type { Configuration, ConfigurationOptions, ConfigurationType } from "../../../pages/admin/CreateService";

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
        setNewConfig({
            key: '',
            label: '',
            type: 'select',
            options: []
        })
        closeFields();
    }


    return (
        <div className="flex flex-col items-center w-full gap-[0.5rem] rounded-[10px]">
            <div className="flex flex-col w-full gap-[0.5rem]">
                <div className="grid grid-cols-[1fr_8fr] items-center w-full">
                    <span className="text-[14px] font-bold">Key</span>
                    <input type="text" name="key" id="service_key" value={newConfig.key} onChange={handleKeyChange} placeholder="Enter a unique key ex. 'color' "
                    className="w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/25 bg-[#f2f2f2] rounded-[10px]"/>
                </div>

                <div className="grid grid-cols-[1fr_8fr] items-center w-full">
                    <span className="text-[14px] font-bold">Label</span>
                    <input type="text" name="label" id="service_label" value={newConfig.label} onChange={handleLabelChange} placeholder="Enter a label for this configuration ex. 'Size' or 'Color'"
                    className="w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/25 bg-[#f2f2f2] rounded-[10px]"/>
                </div>

                <div className="grid grid-cols-[1fr_8fr] items-center w-full">
                    <span className="text-[14px] font-bold">Type</span>
                    <select name="type" id="type" value={newConfig.type} onChange={handleTypeChange}
                    className="w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/25 bg-[#f2f2f2] rounded-[10px]">
                        <option value="select">Dropdown Selection</option>
                        <option value="text">Text Field</option>
                        <option value="number">Number Field</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio</option>
                    </select>
                </div>
                <div className="grid grid-cols-[1fr_8fr] w-full items-start">
                    <span className="text-[14px] font-bold pt-[0.5rem]">Options</span>

                    <div className="flex flex-col gap-[0.2rem] w-full">
                        {options.map(opt => (
                            <span className="bg-[#ffdca5]/75 text-[14px] font-bold p-[0.5rem] px-[0.75rem] rounded-[10px]">{opt.option}</span>
                        ))}

                        {isOptionFieldOpen && (
                            <div className="flex items-center w-full px-[0.5rem] bg-[#f2f2f2] border-2 border-[#ff6b00] border-dashed focus-within:border-solid rounded-[10px]">
                                <input type="text" name="option" id="option_new" value={newOption} onChange={(e)=>setNewOption(e.target.value)}
                                className="w-full text-[14px] font-bold p-[0.5rem] focus:outline-none"/>

                                <button onClick={()=>handleAddOptions({ option: newOption })} className="p-[0.3rem] cursor-pointer hover:bg-[#B1B2B5]/50 rounded-full">
                                    <Check className="size-4"/>
                                </button>
                                <button onClick={()=>setIsOptionFieldOpen(false)} className="p-[0.3rem] cursor-pointer hover:bg-[#B1B2B5]/50 rounded-full">
                                    <Cancel className="size-5"/>
                                </button>
                            </div>
                        )}

                        <button onClick={()=>setIsOptionFieldOpen(true)} className="w-full bg-[#272727] active:bg-[#272727]/75 py-[0.3rem] rounded-[10px] cursor-pointer transition-all duration-100">
                            <span className="text-[14px] text-[#fff] px-[0.5rem]">+ Add options</span>
                        </button>
                    </div>
                </div>
            </div>


            <div className="flex w-full items-center gap-[0.2rem] pt-[0.3rem] border-t border-dashed border-t-[#292929]/25">
                <button onClick={() => handleAddNewConfig({
                    key: newConfig.key,
                    label: newConfig.label,
                    type: newConfig.type,
                    options: options
                })} className="w-full hover:bg-[#ff6b00] active:bg-[#ff6b00]/50 py-[0.3rem] text-[#292929] font-bold rounded-[10px] cursor-pointer transition-all duration-100">Save</button>
                <button onClick={closeFields} className="w-full hover:bg-[#f2f2f2] bg-transparent py-[0.3rem] text-[#292929] font-bold rounded-[10px] cursor-pointer transition-all duration-100">Cancel</button>
            </div>

        </div>
    )
}

export default ConfigurationFields