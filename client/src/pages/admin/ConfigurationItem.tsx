
import type { Configuration, ConfigurationType } from "./CreateService";
import { useState } from "react";

// icons
import Delete from '/src/assets/icon/delete.svg?react'
import Edit from '/src/assets/icon/edit.svg?react'
import Save from '/src/assets/icon/save.svg?react'
import Cancel from '/src/assets/icon/close.svg?react'

interface ConfigItemProp {
    config: Configuration;
    handleDeleteConfig: (key: string) => void;
    selectConfigToEdit: () => void;
    isEditing: boolean
    close: ()=>void;
}

function ConfigurationItem ({ 
    config, 
    handleDeleteConfig, 
    selectConfigToEdit,
    isEditing,
    close
}: ConfigItemProp) {


    const [original, setOriginal] = useState<Configuration>(config);
    const [edited, setEdited] = useState<Configuration>(config);


    return (
        <div className="flex flex-col items-end w-full bg-[#fff] rounded-[10px] text-wrap p-[0.5rem] border border-dashed border-[#292929]/25">
            <div className="flex items-center gap-[0.3rem]">
                {isEditing ? (
                    <>
                        <button title="Delete" className="flex items-center gap-[0.2rem] p-[0.3rem] rounded-[10px] opacity-50 hover:opacity-100 hover:bg-[#B1B2B5]/25 active:bg-[#B1B2B5]/5 cursor-pointer transition-all duration-100">
                            <Save className="size-4" />
                            <span className="text-[14px] font-bold leading-none">Save Changes</span>
                        </button>

                        <button onClick={close} title="close" className="flex items-center gap-[0.2rem] p-[0.3rem] rounded-[10px] opacity-50 hover:opacity-100 hover:bg-[#B1B2B5]/25 active:bg-[#B1B2B5]/5 cursor-pointer transition-all duration-100">
                            <Cancel className="size-4" />
                            <span className="text-[14px] font-bold leading-none">Cancel</span>
                        </button>
                    </>
                ):(
                    <>
                        <button title="Edit" onClick={selectConfigToEdit} className="flex items-center gap-[0.2rem] p-[0.3rem] rounded-[10px] opacity-50 hover:opacity-100 hover:bg-[#B1B2B5]/25 active:bg-[#B1B2B5]/5 cursor-pointer transition-all duration-100">
                            <Edit className="size-4" />
                            <span className="text-[14px] font-bold leading-none">Edit</span>
                        </button>

                        <button onClick={()=>handleDeleteConfig(config.key)} title="Delete" className="flex items-center gap-[0.2rem] p-[0.3rem] rounded-[10px] opacity-50 hover:opacity-100 hover:bg-[#B1B2B5]/25 active:bg-[#B1B2B5]/5 cursor-pointer transition-all duration-100">
                            <Delete className="size-4" />
                            <span className="text-[14px] font-bold leading-none">Delete</span>
                        </button>
                    </>
                )}

            </div>

            <div className="flex flex-wrap items-center w-full gap-[0.5rem] p-[0.5rem]">
                <div className="flex items-center w-full gap-[0.3rem]">
                    <div className="flex flex-col items-start gap-[0.5rem] rounded-[5px] text-wrap w-full min-w-0 break-all">
                        <span className="text-[14px] opacity-75 text-nowrap">Key</span>
                        <input type="text" className={`bg-[#f2f2f2] w-full border ${isEditing ? 'border-[#ff6b00] text-[#ff6b00]' : 'border-[#292929]/15'} p-[0.5rem] rounded-[10px] text-[14px] font-bold text-wrap focus:outline-[#ff6b00]`} disabled={!isEditing} 
                        value={
                            edited 
                                ? edited.key ?? ""
                                : config.key
                        } 
                        onChange={(e) => setEdited(prev =>    
                            prev
                                ? { ...prev, key: e.target.value }
                                : prev
                        )}
                        />
                    </div>
                    <div className="flex flex-col items-start gap-[0.5rem] rounded-[5px] text-wrap w-full min-w-0 break-all">
                        <span className="text-[14px] opacity-75 text-nowrap">Label</span>
                        <input type="text" className={`bg-[#f2f2f2] w-full border ${isEditing ? 'border-[#ff6b00] text-[#ff6b00]' : 'border-[#292929]/15'} p-[0.5rem] rounded-[10px] text-[14px] font-bold text-wrap focus:outline-[#ff6b00]`} disabled={!isEditing}
                        value={
                            edited 
                                ? edited.label ?? ""
                                : config.label
                        } 
                        onChange={(e)=>setEdited(prev =>
                            prev 
                                ? {...prev, label: e.target.value}
                                : prev
                        )}
                        />
                    </div>
                    <div className="flex flex-col items-start gap-[0.5rem] rounded-[5px] text-wrap w-full min-w-0 break-all">
                        <span className="text-[14px] opacity-75 text-nowrap">Type</span>
                        <select name="type_config" id="type_config" disabled={isEditing}
                        className={`bg-[#f2f2f2] w-full border ${isEditing ? 'border-[#ff6b00] text-[#ff6b00]' : 'border-[#292929]/15'} p-[0.5rem] rounded-[10px] text-[14px] font-bold text-wrap focus-within:outline-[#ff6b00]`}
                        value={
                            edited
                                ? edited.type 
                                : config.type 
                        }
                        onChange={(e)=>setEdited(prev =>
                            prev 
                                ? {...prev, type: e.target.value as ConfigurationType}
                                : prev
                        )}
                        >
                            <option value="select">Dropdown Selection</option>
                            <option value="text">Text Field</option>
                            <option value="number">Number Field</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="radio">Radio</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-[0.2rem] rounded-[5px] text-wrap w-full min-w-0 break-all">
                    <span className="text-[14px] opacity-75 text-nowrap">Options:</span>
                    <div className="flex flex-wrap items-center gap-[0.3rem]">
                        {config.options.map((opt, index)=>(
                            <div key={index} className="flex items-center gap-[0.5rem] bg-[#ff6b00]/20 min-w-[100px] border border-[#ff6b00]/30 p-[0.5rem] rounded-[10px] focus-within:border-[#ff6b00]">
                                {/* if editing mode */}
                                {/* <input className="text-[14px] font-bold text-wrap focus:outline-none" value={opt.option} disabled/> */}

                                <span className="text-[14px] font-bold">{opt.option}</span>

                                <div className="flex items-center gap-[0.3rem]">
                                    <button title="Edit" className="opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer transition-all duration-100">
                                        <Edit className="size-4" />
                                    </button>

                                    <button title="Delete" className="opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer transition-all duration-100">
                                        <Delete className="size-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ConfigurationItem;