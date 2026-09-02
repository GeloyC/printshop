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
    const [newOption, setNewOption] = useState<ConfigurationOptions>({
        option: '',
        price: 0
    })
    const [options, setOptions] = useState<ConfigurationOptions[]>([]);

    const handleAddOptions = ({option, price}: ConfigurationOptions) => {
        setOptions((opt) => [...opt, { option, price }]);
        
        setNewOption({
            option: '',
            price: 0
        });
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
        <form onSubmit={() => handleAddNewConfig({
                    key: newConfig.key,
                    label: newConfig.label,
                    type: newConfig.type,
                    options: options
                })} className="fade-up flex flex-col w-[700px] bg-[#fff] gap-[1rem] p-[2rem] rounded-[20px]">

            <span className="text-[24px] font-bold">New configuration</span>

            <div className="flex flex-col w-full gap-[0.5rem]">
                <div className="flex items-center w-full gap-[1rem]">
                    <div className="flex flex-col w-full gap-[0.2rem]">
                        <span className="text-[14px] font-bold">Key</span>
                        <input type="text" name="key" id="service_key" value={newConfig.key} onChange={handleKeyChange} placeholder="Ex. 'color'" required
                        className="min-w-0 w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/15 bg-[#f2f2f2]/75 rounded-[10px]"/>
                    </div>

                    <div className="flex flex-col w-full gap-[0.2rem]">
                        <span className="text-[14px] font-bold">Label</span>
                        <input type="text" name="label" id="service_label" value={newConfig.label} onChange={handleLabelChange} placeholder="Ex. 'Size' or 'Color'" required
                        className="min-w-0 w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/15 bg-[#f2f2f2]/75 rounded-[10px]"/>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-[0.2rem] border-t border-dashed border-t-[#292929]/10 pt-[0.5rem]">
                    <span className="text-[14px] font-bold">Type</span>
                    <select name="type" id="type" value={newConfig.type as ConfigurationType} onChange={handleTypeChange}
                    className="w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/15 bg-[#f2f2f2]/75 rounded-[10px]">
                        <option hidden disabled>-- Select type --</option>
                        <option value="select">Dropdown Selection</option>
                        <option value="text">Text Field</option>
                        <option value="number">Number Field</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio</option>
                    </select>
                </div>
                <div className="flex flex-col w-full gap-[0.2rem] border-t border-dashed border-t-[#292929]/10 pt-[0.5rem]">
                    <div className="flex items-center justify-between gap-[0.3rem] w-full">
                        <span className="text-[14px] font-bold">Options</span>

                        <button type="button" onClick={()=>setIsOptionFieldOpen(true)} 
                        disabled={isOptionFieldOpen}
                        className={`bg-[#272727]  rounded-[15px] pb-[0.1rem] transition-all duration-100 ${isOptionFieldOpen ? 'opacity-25 cursor-not-allowed' : 'active:bg-[#272727]/75 cursor-pointer'}`}>
                            <span className="text-[12px] text-[#fff] px-[0.5rem]  leading-none">+ Add</span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-[0.5rem] w-full break-all">

                        <div className="flex flex-wrap items-center w-full gap-[0.2rem]">
                            {options.length > 0 ? (
                                options.map(opt => (
                                    <span className="bg-[#ffdca5]/75 text-[14px] font-bold p-[0.5rem] px-[0.75rem] rounded-[10px]">{opt.option} | Php {opt.price}</span>
                                ))
                            ): (
                                !isOptionFieldOpen && (
                                    <span className="text-[14px] font-bold rounded-[10px] opacity-50">No options yet...</span>
                                )
                            )}

                        </div>

                        {isOptionFieldOpen && (
                            <div className="flex items-center w-full px-[0.5rem] bg-[#f2f2f2] border border-[#292929]/50 border-dashed focus-within:border-solid focus-within:border-[#292929] rounded-[10px]">
                                <div className="flex items-center w-full gap-[1rem]">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-[14px] font-bold text-nowrap">Name:</span>
                                        <input type="text" name="option" id="option_new" 
                                        value={newOption.option} 
                                        onChange={(e)=>setNewOption(prev =>({...prev, option:e.target.value}))} 
                                        required
                                        className="w-full text-[14px] font-bold p-[0.5rem] focus:outline-none"/>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-[14px] font-bold text-nowrap">Price:</span>

                                        <input type="number" name="option" id="option_new" 
                                        value={newOption.price}
                                        onChange={(e)=>setNewOption(prev =>({...prev, price:Number(e.target.value)}))} 
                                        className="w-full text-[14px] font-bold p-[0.5rem] focus:outline-none"/>
                                    </div>
                                </div>

                                <button 
                                    onClick={
                                        ()=>handleAddOptions({ 
                                        option: newOption.option, 
                                        price: newOption.price 
                                    })} 
                                    className="p-[0.3rem] cursor-pointer hover:bg-[#B1B2B5]/50 rounded-full">
                                    <Check className="size-4"/>
                                </button>
                                <button onClick={()=>setIsOptionFieldOpen(false)} className="p-[0.3rem] cursor-pointer hover:bg-[#B1B2B5]/50 rounded-full">
                                    <Cancel className="size-5"/>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            <div className="flex w-full items-center justify-end gap-[0.2rem] pt-[1rem]">
                <div className="flex w-full items-center justify-end gap-[0.2rem] pt-[1rem]">
                <button type="button" onClick={closeFields} className="w-[8rem] hover:bg-[#f2f2f2] bg-transparent py-[0.5rem] px-[1rem] text-[#292929] font-bold rounded-[10px] cursor-pointer transition-all duration-100">Cancel</button>
                <button className="w-[8rem] bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#ff6b00] py-[0.5rem] px-[1rem] text-[#fff] font-bold rounded-[10px] cursor-pointer transition-all duration-100">Save</button>
            </div>
            </div>

        </form>
    )
}

export default ConfigurationFields