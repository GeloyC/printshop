// import type { 
//     Configuration, ConfigurationOptions, ConfigurationType } from "../../../pages/admin/CreateService/CreateService";

import type { 
    Configuration,
    ConfigurationOptions,
    ConfigurationType
} from "../../../types/service/service";

import { useState, type SetStateAction } from "react";

// icons
import Cancel from '/src/assets/icon/close.svg?react'
import Check from '/src/assets/icon/save-check.svg?react'
import Delete from '/src/assets/icon/delete.svg?react'
import Edit from '/src/assets/icon/edit.svg?react'

interface ModalProp {
    selectedConfig: Configuration
    close: () => void
    setSelectedConfigEdit: React.Dispatch<SetStateAction<Configuration>>
    setConfigs:React.Dispatch<SetStateAction<Configuration[]>>
}

function ConfigurationEditModal ({
    selectedConfig,
    setSelectedConfigEdit,
    setConfigs,
    close
}: ModalProp) {



    const [isOptionFieldOpen, setIsOptionFieldOpen] = useState<boolean>(false);
    const [newOption, setNewOption] = useState<ConfigurationOptions>({
        id: '',
        option: '',
        price: 0
    });

    const [optionToEdit, setOptionToEdit] = useState<ConfigurationOptions>({
        id: '',
        option: '',
        price: 0 
    });


    const handleSelectOption = (id: string) => {
        const selected = selectedConfig?.options.find(item => item.id === id);

        if (!selected) return;

        setOptionToEdit(selected)
    } 
    
    
    const handleAddOptions = ({id, option, price}: ConfigurationOptions) => {
        if (!option) {
            return console.log('Option name is empty!');
        }
        if (price === 0) {
            return console.log('Price is not set properly!');
        }

        setSelectedConfigEdit((prev:Configuration) => ({
            ...prev,
            options: [
                ...prev.options,
                {id, option, price}
            ]
        }));

        setNewOption({
            id: '',
            option: '',
            price: 0
        });

        setIsOptionFieldOpen(false);
    }


    const handleDeleteOption = (option_name: string) => {
        setSelectedConfigEdit((prev) => ({
            ...prev,
            options: prev.options.filter(
                (opt) => opt.option !== option_name
            )
        }));
    };

    const closeOptionEditField = () => {
        setOptionToEdit({
            id: '',
            option: '',
            price: 0 
        })
    }

    const handleSaveOption = (editedOption: ConfigurationOptions) => {
        // save the edited option using this function
        setSelectedConfigEdit((prev:Configuration) => ({
            ...prev,
            options: prev.options.map((opt) =>
                opt.id === editedOption.id
                    ? editedOption
                    : opt
            )
        }));

        closeOptionEditField();
    }

    const handleSaveForm = (editedConfig: Configuration) => {
        console.log('Form Saved');
        console.log(selectedConfig);

        setConfigs(prev =>
            prev.map(config => 
                config.id === editedConfig.id
                    ? editedConfig
                    : config
            )
        )
        close();
    }



    return (
        <form onSubmit={() => handleSaveForm(selectedConfig)} className="fade-up flex flex-col w-[700px] bg-[#fff] gap-[1rem] p-[2rem]">

            <span className="text-[24px] font-bold">Edit configuration</span>

            <div className="flex flex-col w-full gap-[0.5rem]">
                <div className="flex items-center w-full gap-[1rem]">
                    <div className="flex flex-col w-full gap-[0.2rem]">
                        <span className="text-[14px] font-bold">Key</span>
                        <input type="text" name="key" id="service_key" 
                        value={selectedConfig.key} 
                        onChange={(e)=>setSelectedConfigEdit((prev) => ({
                            ...prev, 
                            key: e.target.value
                        }))}

                        className="min-w-0 w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/15 bg-[#f2f2f2]/75"/>
                    </div>

                    <div className="flex flex-col w-full gap-[0.2rem]">
                        <span className="text-[14px] font-bold">Label</span>
                        <input type="text" name="label" id="service_label" 
                        value={selectedConfig.label}
                        onChange={(e)=>setSelectedConfigEdit((prev) => ({
                            ...prev, 
                            label: e.target.value
                        }))}
                        className="min-w-0 w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/15 bg-[#f2f2f2]/75"/>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-[0.2rem] border-t border-dashed border-t-[#292929]/10 pt-[0.5rem]">
                    <span className="text-[14px] font-bold">Type</span>
                    <select name="type" id="type" 
                    value={selectedConfig?.type as ConfigurationType}
                    onChange={(e)=>setSelectedConfigEdit((prev) => ({
                        ...prev,
                        type: e.target.value as ConfigurationType
                    }))}

                    className="w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/15 bg-[#f2f2f2]/75">
                        <option hidden disabled>-- Select type --</option>
                        <option value="select">Dropdown Selection</option>
                        <option value="text">Text Field</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio</option>
                    </select>
                </div>
                <div className="flex flex-col w-full gap-[0.5rem] border-t border-dashed border-t-[#292929]/10 pt-[0.5rem]">
                    <div className="flex items-center justify-between gap-[0.3rem] w-full">
                        <span className="text-[14px] font-bold">Options</span>

                        <button type="button" 
                        onClick={()=>setIsOptionFieldOpen(true)}
                        disabled={isOptionFieldOpen}
                        className={`bg-[#272727] py-[0.3rem] ${isOptionFieldOpen ? 'opacity-50 cursor-not-allowed' : 'active:bg-[#272727]/75 cursor-pointer'} transition-all duration-100`}> 
                            <span className="text-[14px] text-[#fff] px-[0.5rem] leading-none">+ Add</span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-[0.5rem] w-full break-all">
                        <div className="flex flex-col items-start w-full gap-[0.2rem]">
                            {selectedConfig.options.map((opt) => (
                                optionToEdit.id === opt.id ? (
                                    <div className="flex items-center justify-between w-full px-[0.5rem] bg-[#fff8ec] border-2 border-[#ff6b00]/50 border-dashed focus-within:border-solid focus-within:border-[#ff6b00]/75">
                                        <div className="flex items-center gap-[1rem] w-full">
                                            <div className="flex items-center  min-w-0 w-full">
                                                <span className="text-[14px] font-bold text-nowrap">Name:</span>
                                                <input type="text" name="option" id="option_name" 
                                                value={optionToEdit?.option} 
                                                onChange={(e)=>setOptionToEdit((prev) =>({...prev, option:e.target.value}))} 
                                                required
                                                className="text-[14px] font-bold p-[0.5rem] focus:outline-none"/>
                                            </div>

                                            <div className="flex items-center min-w-0 w-full">
                                                <span className="text-[14px] font-bold text-nowrap">Price:</span>
                                                <input type="number" name="option" id="option_price" 
                                                value={optionToEdit?.price}
                                                onChange={(e)=>setOptionToEdit((prev) =>({...prev, price:Number(e.target.value)}))} 
                                                className="text-[14px] font-bold p-[0.5rem] focus:outline-none"/>
                                            </div>
                                        </div>

                                        <button type="button"
                                            onClick={
                                                ()=>handleSaveOption(optionToEdit)} 
                                            className="p-[0.3rem] cursor-pointer hover:bg-[#B1B2B5]/50">
                                            <Check className="size-4"/>
                                        </button>
                                        <button type="button" 
                                            onClick={closeOptionEditField} className="p-[0.3rem] cursor-pointer hover:bg-[#B1B2B5]/50">
                                            <Cancel className="size-5"/>
                                        </button>
                                    </div>
                                ) : (
                                    <div className={`${opt.id === optionToEdit.id ? 'hidden' : 'flex'} flex items-center justify-between w-full gap-[1rem] bg-[#ffdca5]/75 border-2 border-[#ffdca5] p-[0.5rem] px-[0.75rem]`}>

                                        <div className="flex items-center gap-[1rem] w-full">
                                            <div className="flex items-center gap-[0.3rem] min-w-0 w-full">
                                                <span className="text-[14px] font-bold text-nowrap opacity-50">Name:</span>
                                                <span className="text-[14px] font-bold">{opt.option}</span>
                                            </div>

                                            <div className="flex items-center gap-[0.3rem] min-w-0 w-full">
                                                <span className="text-[14px] font-bold text-nowrap opacity-50">Price:</span>
                                                <span className="text-[14px] font-bold">{opt.price}</span>
                                            </div>
                                        </div>
                                        

                                        <div className="flex items-center gap-[0.3rem]">
                                            <button type="button" onClick={()=>handleSelectOption(opt.id)} className="opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer">
                                                <Edit className="size-4"/>
                                            </button>
                                            <button type="button" onClick={()=>handleDeleteOption(opt.option)} className="opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer">
                                                <Delete className="size-4"/>
                                            </button>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>

                        

                        {isOptionFieldOpen && (
                            <div className="flex items-center w-full px-[0.5rem] bg-[#f2f2f2] border-2 border-[#292929]/50 border-dashed focus-within:border-solid focus-within:border-[#292929]">
                                <div className="flex items-center w-full gap-[1rem]">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-[14px] font-bold opacity-50 text-nowrap">Name:</span>
                                        <input type="text" name="option" id="option_new" 
                                        value={newOption.option} 
                                        onChange={(e)=>setNewOption((prev) =>({...prev, option:e.target.value}))} 
                                        className="w-full text-[14px] font-bold p-[0.5rem] focus:outline-none"/>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-[14px] font-bold opacity-50 text-nowrap">Price:</span>

                                        <input type="number" name="option" id="option_new" 
                                        value={newOption.price}
                                        onChange={(e)=>setNewOption((prev) =>({...prev, price:Number(e.target.value)}))} 
                                        className="w-full text-[14px] font-bold p-[0.5rem] focus:outline-none"/>
                                    </div>
                                </div>

                                <button type='button'
                                    onClick={
                                        ()=>handleAddOptions({ 
                                            id: crypto.randomUUID(),
                                            option: newOption.option, 
                                            price: newOption.price 
                                        })} 
                                    className="p-[0.3rem] cursor-pointer hover:bg-[#B1B2B5]/50">
                                    <Check className="size-4"/>
                                </button>
                                <button type='button'
                                onClick={()=>setIsOptionFieldOpen(false)} className="p-[0.3rem] cursor-pointer hover:bg-[#B1B2B5]/50">
                                    <Cancel className="size-5"/>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            <div className="flex w-full items-center justify-end gap-[0.2rem] pt-[1rem]">
                <button type="button" onClick={close} className="w-[8rem] hover:bg-[#f2f2f2] bg-transparent py-[0.5rem] px-[1rem] text-[#292929] font-bold cursor-pointer transition-all duration-100">Cancel</button>
                <button className="w-[8rem] bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#ff6b00] py-[0.5rem] px-[1rem] text-[#fff] font-bold cursor-pointer transition-all duration-100">Save</button>
            </div>

        </form>
    )

} 

export default ConfigurationEditModal;