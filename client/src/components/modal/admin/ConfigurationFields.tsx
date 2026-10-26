import { useState, type SetStateAction } from "react";

// icons
import Cancel from '/src/assets/icon/close.svg?react'
import Check from '/src/assets/icon/save-check.svg?react'
import Delete from '/src/assets/icon/delete_v2.svg?react'
import Edit from '/src/assets/icon/edit.svg?react'


// types
// import type { Configuration, ConfigurationOptions, ConfigurationType } from "../../../pages/admin/CreateService/CreateService";
import type { 
    Configuration,
    ConfigurationOptions,
    ConfigurationType
} from "../../../types/service/service"
import TextType from "../../ui/ConfigurationType/TextType";

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
        id: '',
        option: '',
        price: 0
    });

    const [optionToEdit, setOptionToEdit] = useState<ConfigurationOptions>({
        id: '',
        option: '',
        price: 0 
    });


    const [options, setOptions] = useState<ConfigurationOptions[]>([]);

    const handleAddOptions = ({id = crypto.randomUUID(), option, price}: ConfigurationOptions) => {
        setOptions((opt) => [...opt, {id, option, price }]);
        
        setNewOption({ 
            id: "",
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


    // -------------- EDITING THE OPTION --------------- //

    const handleEditOption = (id: string) => {
        const selected = options.find(item => item.id === id);
        if (!selected) return;

        setOptionToEdit(selected)
    }

    const handleDeleteOption = (id: string) => {
        setOptions(item => item.filter(opt => opt.id !== id))
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
        setOptions(prev => prev.map(item => (
            item.id === editedOption.id
                ? editedOption
                : item
        )));

        closeOptionEditField();
    }

    const handleAddNewConfig = (value: Configuration) => {
        setConfigs(config => [...config, value]);
        setNewConfig({
            id: crypto.randomUUID(),
            key: '',
            label: '',
            type: '',
            options: []
        })
        closeFields();
    }


    return (
        <form onSubmit={() => {
                handleAddNewConfig({
                    id: crypto.randomUUID(),
                    key: newConfig.key,
                    label: newConfig.label,
                    type: newConfig.type,
                    options: options
                });
            }} className="fade-up flex flex-col w-[700px] bg-[#fff] rounded-[5px] gap-[1rem] p-[2rem]">

            <span className="text-[24px] font-bold">New configuration</span>

            <div className="flex flex-col w-full gap-[0.5rem]">
                <div className="flex items-center w-full gap-[1rem]">
                    <div className="flex flex-col w-full gap-[0.2rem]">
                        <span className="text-[14px] font-bold">Key</span>
                        <input type="text" name="key" id="service_key" value={newConfig.key} onChange={handleKeyChange} placeholder="Ex. 'color'" required
                        className="min-w-0 w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/15 bg-[#f2f2f2]/75 rounded-[5px]"/>
                    </div>

                    <div className="flex flex-col w-full gap-[0.2rem]">
                        <span className="text-[14px] font-bold">Label</span>
                        <input type="text" name="label" id="service_label" value={newConfig.label} onChange={handleLabelChange} placeholder="Ex. 'Size' or 'Color'" required
                        className="min-w-0 w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/15 bg-[#f2f2f2]/75 rounded-[5px]"/>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-[0.2rem] border-t border-dashed border-t-[#292929]/10 pt-[0.5rem]">
                    <span className="text-[14px] font-bold">Type</span>
                    <select
                        name="type"
                        id="type"
                        value={newConfig.type ?? ""}
                        onChange={handleTypeChange}
                        required
                        className="flex w-full p-[0.5rem] text-[14px] text-[#292929] font-bold border border-[#292929]/15 bg-[#f2f2f2]/75 rounded-[5px] appearance-none"
                    >
                        <option value="" disabled>
                            -- Select type --
                        </option>

                        <option value="select">Dropdown Selection (select)</option>
                        <option value="checkbox">Checkbox (checkbox)</option>
                        <option value="radio">Radio (radio)</option>
                    </select>
                </div>

                {(newConfig.type === 'select' || newConfig.type === 'checkbox' || newConfig.type ===  'radio') && (
                    <div className="flex flex-col w-full gap-[0.2rem] border-t border-dashed border-t-[#292929]/10 pt-[0.5rem]">
                        <div className="flex items-center justify-between gap-[0.3rem] w-full">
                            <span className="text-[14px] font-bold">Options</span>

                            <button type="button" onClick={()=>setIsOptionFieldOpen(true)} 
                            disabled={isOptionFieldOpen}
                            className={`bg-[#272727] pb-[0.1rem] transition-all duration-100 rounded-[5px] ${isOptionFieldOpen ? 'opacity-25 cursor-not-allowed' : 'active:bg-[#272727]/75 cursor-pointer'}`}>
                                <span className="text-[12px] text-[#fff] px-[0.5rem]  leading-none">+ Add</span>
                            </button>
                        </div>

                        <div className="flex flex-col gap-[0.5rem] w-full break-all">

                            <div className="flex flex-col items-start w-full gap-[0.2rem]">
                                {options.length > 0 ? (
                                    options.map(opt => (
                                        optionToEdit.id === opt.id ? (
                                            <div className="flex items-center justify-between w-full px-[0.5rem] bg-[#fff8ec] rounded-[5px] border-2 border-[#ff6b00]/50 border-dashed focus-within:border-solid focus-within:border-[#ff6b00]/75">
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

                                                <button type="button" onClick={()=>handleSaveOption(optionToEdit)} className="p-[0.3rem] cursor-pointer hover:bg-[#B1B2B5]/50">
                                                    <Check className="size-4"/>
                                                </button>
                                                <button type="button" onClick={closeOptionEditField} className="p-[0.3rem] cursor-pointer hover:bg-[#B1B2B5]/50">
                                                    <Cancel className="size-5"/>
                                                </button>
                                            </div>
                                        ): (
                                            <div key={opt.id} className="flex items-center w-full bg-[#ffdca5]/75 p-[0.5rem] px-[0.75rem] rounded-[5px]">
                                                <div className="grid grid-cols-2  w-full">
                                                    <span className="text-[14px] font-bold">Name: {opt.option}</span>
                                                    <span className="text-[14px] font-bold">Price: Php {opt.price}</span>
                                                </div>

                                                <div className="flex items-center gap-[0.5rem]">
                                                    <button type="button" onClick={()=>handleEditOption(opt.id)} className="cursor-pointer text-nowrap">
                                                        <Edit className="size-4"/>
                                                    </button>
                                                    <button type="button" onClick={()=>handleDeleteOption(opt.id)} className="cursor-pointer text-nowrap">
                                                        <Delete className="size-4"/>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    ))
                                ): (
                                    !isOptionFieldOpen && (
                                        <span className="text-[14px] font-bold opacity-50">No options yet...</span>
                                    )
                                )}
                            </div>

                            {isOptionFieldOpen && (
                                <div className="flex items-center w-full px-[0.5rem] bg-[#f2f2f2] rounded-[5px] border border-[#292929]/50 border-dashed focus-within:border-solid focus-within:border-[#292929]">
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
                                                id: crypto.randomUUID(),
                                                option: newOption.option, 
                                                price: newOption.price 
                                            })} 
                                        className="p-[0.3rem] cursor-pointer hover:bg-[#B1B2B5]/50">
                                        <Check className="size-4"/>
                                    </button>
                                    <button onClick={()=>setIsOptionFieldOpen(false)} className="p-[0.3rem] cursor-pointer hover:bg-[#B1B2B5]/50 ">
                                        <Cancel className="size-5"/>
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </div>


            <div className="flex w-full items-center justify-end gap-[0.2rem] pt-[1rem]">
                <div className="flex w-full items-center justify-end gap-[0.2rem] pt-[1rem]">
                    <button type="button" onClick={closeFields} className="w-[8rem] hover:bg-[#f2f2f2] bg-transparent rounded-[5px] py-[0.5rem] px-[1rem] text-[#292929] font-bold cursor-pointer transition-all duration-100">Cancel</button>
                    <button className="w-[8rem] bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#ff6b00] rounded-[5px] py-[0.5rem] px-[1rem] text-[#fff] font-bold cursor-pointer transition-all duration-100">Save</button>
                </div>
            </div>

        </form>
    )
}

export default ConfigurationFields