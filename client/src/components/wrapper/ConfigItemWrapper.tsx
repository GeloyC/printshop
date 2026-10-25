import { useState } from "react"

interface ConfigItemWrapperProp { 
    configLabel: string,
    configType: string,
    children: React.ReactNode
}


function ConfigItemWrapper ({ configLabel, configType, children }: ConfigItemWrapperProp) {
    
    const [type, setType] = useState<string>(configType) // the type will be taken from the data collected from created service
    const isGridType = ['select', 'text', 'number'].includes(configType);

    console.log('type: ', type);
    return (
        <div className="flex flex-col w-full gap-[0.5rem]">
            <span className="text-[14px] text-[#575757] font-bold leading-none">{configLabel}</span>

            {/* Change to flex when type is Number field, text field, and select */}
            <div
                className={`${
                    isGridType
                        ? 'flex items-center'
                        : 'grid grid-cols-2'
                } w-full gap-1`}
            >
                { children }
            </div>
        </div>
    )
}

export default ConfigItemWrapper;