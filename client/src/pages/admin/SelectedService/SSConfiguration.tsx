import ConfigurationItem from "../../../components/admin/ServiceConfiguration/ConfigurationItem";

// types
import type { Configuration } from "../../../types/admin/service";
import type { SetStateAction } from "react";

interface SSConfigurationProp {
    configs: Configuration[]
    setConfigs: React.Dispatch<SetStateAction<Configuration[]>>
    setSelectedConfigEdit: React.Dispatch<SetStateAction<Configuration>>,
    openEditModal: () => void;
}

function SSConfiguration ({
    configs,
    setConfigs,
    setSelectedConfigEdit,
    openEditModal
}: SSConfigurationProp) {

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
        <div className="flex flex-col gap-[1rem]">
            <div className="flex items-center justify-between w-full">
                <span className="text-[16px] font-bold">Configuration</span>
                <button className={`bg-[#292929] hover:bg-[#404040] active:bg-[#292929] px-[0.5rem] py-[0.3rem] cursor-pointer`}>
                    <span className="text-[#fff] text-[14px]">+ Add configuration</span>
                </button>
            </div>

            <p className="text-[14px] opacity-75">Add a short description or instruction here about the configuration</p>


            <div className="flex flex-col w-full">
                {configs.map(config => (
                    <ConfigurationItem 
                        config={config}
                        onDelete={handleDeleteConfig}
                        selectConfigToEdit={()=>selectConfigToEdit(config.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default SSConfiguration;