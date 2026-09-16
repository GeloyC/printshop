import type { SetStateAction } from "react"
import type { Configuration } from "../../../types/service/service"

import ConfigurationItem from "../../../components/admin/ServiceConfiguration/ConfigurationItem"

interface ConfigurationProp {
    setIsConfigFieldOpen: React.Dispatch<SetStateAction<boolean>>
    isConfigFieldOpen: boolean
    configs: Configuration[]
    setConfigs: React.Dispatch<SetStateAction<Configuration[]>>
    setSelectedConfigEdit: React.Dispatch<SetStateAction<Configuration>>
    openEditModal: ()=>void;
}

function CSConfiguration ({
    setIsConfigFieldOpen,
    isConfigFieldOpen,
    configs,
    setConfigs,
    setSelectedConfigEdit,
    openEditModal
}: ConfigurationProp) {


    const handleDeleteConfig = (id: string) => {
        setConfigs(config => config.filter(item => item.id !== id));
    }

    const selectConfigToEdit = (id: string) => {
        const selected = configs.find(item => item.id === id);

        if (!selected) return;

        setSelectedConfigEdit(selected);
        openEditModal();
    }
    
    return (
        <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="flex items-center justify-between w-full">
                <span className="text-[16px] text-[#292929] font-bold">Configuration</span>

                <button onClick={()=>setIsConfigFieldOpen(true)} className={`bg-[#292929] hover:bg-[#404040] active:bg-[#292929] px-[0.5rem] py-[0.3rem] ${isConfigFieldOpen ? 'opacity-50' : 'cursor-pointer'}`}>
                    <span className="text-[#fff] text-[14px]">+ Add configuration</span>
                </button>
            </div>

            <p className="text-[14px] opacity-75">Add a short description or instruction here about the configuration</p>

            {configs?.length > 0 && (
                <div className="flex flex-col w-full gap-[0.5rem]">
                    {configs.map(config=>(
                        <ConfigurationItem key={config.key}
                            config={config}
                            onDelete={handleDeleteConfig}
                            selectConfigToEdit={()=>selectConfigToEdit(config.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CSConfiguration