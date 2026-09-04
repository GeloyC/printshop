
import type { Configuration } from "./CreateService";

// icons
import Delete from '/src/assets/icon/delete.svg?react'
import Edit from '/src/assets/icon/edit.svg?react'
import Folder from '/src/assets/icon/configuration-item.svg?react'

interface ConfigItemProp {
    config: Configuration;
    handleDeleteConfig: (id: string) => void;
    selectConfigToEdit: () => void;
}

function ConfigurationItem ({ 
    config, 
    handleDeleteConfig, 
    selectConfigToEdit,
}: ConfigItemProp) {

    return (
        <div className="group flex flex-col items-start w-full bg-[#f2f2f2]/50 rounded-[10px] p-[1rem]">
            <div className="flex items-center justify-between gap-[0.5rem] w-full transition-all duration-100">
                <div className="flex items-center gap-[0.5rem]">
                    <Folder className="size-5" />
                    <span className="text-[14px] font-bold leading-none">{config.label}</span>
                </div>

                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-[0.3rem]">
                    <button title="Edit" onClick={selectConfigToEdit} className="flex items-center gap-[0.2rem] p-[0.3rem] rounded-[10px] opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer transition-all duration-100">
                        <Edit className="size-4" />
                        <span className="text-[14px] font-bold leading-none">Edit</span>
                    </button>

                    <button onClick={()=>handleDeleteConfig(config.id)} title="Delete" className="flex items-center gap-[0.2rem] p-[0.3rem] rounded-[10px] opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer transition-all duration-100">
                        <Delete className="size-4" />
                        <span className="text-[14px] font-bold leading-none">Delete</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center w-full gap-[1rem] opacity-50">
                <div className="flex items-center gap-[0.3rem] border-r border-dashed border-r-[#292929]/25 pr-[1rem]">
                    <span className="text-[14px]">Key: </span>
                    <span className="text-[14px] font-bold">{config.key}</span>
                </div>

                <div className="flex items-center gap-[0.3rem] border-r border-dashed border-r-[#292929]/25 pr-[1rem]">
                    <span className="text-[14px]">type: </span>
                    <span className="text-[14px] font-bold">{config.type}</span>
                </div>

                <span className="text-[14px] font-bold">{config.options.length} options</span>
            </div>
            
        </div>
    )

}

export default ConfigurationItem;