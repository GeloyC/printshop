import type { Configuration, ConfigurationOptions, ConfigurationType } from "../../../pages/admin/CreateService";

import { useState, type SetStateAction } from "react";

import Delete from '/src/assets/icon/delete.svg?react'
import Edit from '/src/assets/icon/edit.svg?react'

interface ModalProp {
    selectedConfig: Configuration
    close: () => void
}

function ConfigurationEditModal ({
    selectedConfig,
    close
}: ModalProp) {

    
    console.log(
        selectedConfig.options
    );

    const [options, setOptions] = useState<ConfigurationOptions[]|undefined>(selectedConfig.options);
    const [optionToEdit, setOptionToEdit] = useState<ConfigurationOptions|undefined>(undefined);

    console.log('selected option: ', options);

    const handleSelectOption = (option_name: string) => {
        const selected = selectedConfig?.options.find(item => item.option === option_name);

        console.log('Selected Option: ', selected?.option, selected?.price);
        setOptionToEdit(selected)
    } 


    const handleDeleteOption = (option_name: string) => {
        setOptions(option => {
            try{
                return option?.filter(item => item.option !== option_name)
            } catch (err) {
                console.log('What is the error: ', err)
            }
        })

        console.log(option_name);
    }



    return (
        <form className="fade-up flex flex-col w-[700px] bg-[#fff] gap-[1rem] p-[2rem] rounded-[20px]">

            <span className="text-[24px] font-bold">Edit configuration</span>

            <div className="flex flex-col w-full gap-[0.5rem]">
                <div className="flex items-center w-full gap-[1rem]">
                    <div className="flex flex-col w-full gap-[0.2rem]">
                        <span className="text-[14px] font-bold">Key</span>
                        <input type="text" name="key" id="service_key" defaultValue={selectedConfig?.key} 
                        className="min-w-0 w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/15 bg-[#f2f2f2]/75 rounded-[10px]"/>
                    </div>

                    <div className="flex flex-col w-full gap-[0.2rem]">
                        <span className="text-[14px] font-bold">Label</span>
                        <input type="text" name="label" id="service_label" defaultValue={selectedConfig?.label}
                        className="min-w-0 w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/15 bg-[#f2f2f2]/75 rounded-[10px]"/>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-[0.2rem] border-t border-dashed border-t-[#292929]/10 pt-[0.5rem]">
                    <span className="text-[14px] font-bold">Type</span>
                    <select name="type" id="type" defaultValue={selectedConfig?.type as ConfigurationType}
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

                        <button type="button"
                        className={`bg-[#272727]  rounded-[15px] pb-[0.1rem] transition-all duration-100 active:bg-[#272727]/75 cursor-pointer`}>
                            <span className="text-[12px] text-[#fff] px-[0.5rem]  leading-none">+ Add</span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-[0.5rem] w-full break-all">
                        <div className="flex flex-wrap items-center w-full gap-[0.2rem]">
                                {options?.map(opt => (
                                    <div className="flex items-center gap-[1rem] bg-[#ffdca5]/75 p-[0.5rem] px-[0.75rem] rounded-[10px]">
                                        <span className="text-[14px] font-bold">{opt.option} | Php {opt.price}</span>

                                        <div className="flex items-center gap-[0.3rem]">
                                            <button type="button" onClick={()=>handleSelectOption(opt.option)} className="opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer">
                                                <Edit className="size-4"/>
                                            </button>
                                            <button type="button" onClick={()=>handleDeleteOption(opt.option)} className="opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer">
                                                <Delete className="size-4"/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex w-full items-center justify-end gap-[0.2rem] pt-[1rem]">
                <button type="button" onClick={close} className="w-[8rem] hover:bg-[#f2f2f2] bg-transparent py-[0.5rem] px-[1rem] text-[#292929] font-bold rounded-[10px] cursor-pointer transition-all duration-100">Cancel</button>
                <button className="w-[8rem] bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#ff6b00] py-[0.5rem] px-[1rem] text-[#fff] font-bold rounded-[10px] cursor-pointer transition-all duration-100">Save</button>
            </div>

        </form>
    )

} 

export default ConfigurationEditModal;