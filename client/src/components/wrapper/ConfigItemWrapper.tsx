import { useState } from "react"

import type { ConfigurationType } from "../../types/service/service"

interface ConfigItemWrapperProp { 
    configLabel: string,
    children: React.ReactNode
}


function ConfigItemWrapper ({ configLabel, children }: ConfigItemWrapperProp) {
    
    const [type, setType] = useState<ConfigurationType>() // the type will be taken from the data collected from created service
    const ifType = type === 'select' || type === 'text';


    return (
        <div className="flex flex-col w-full gap-[0.5rem]">
            <span className="text-[14px] text-[#575757] font-bold leading-none">{configLabel}</span>

            {/* Change to flex when type is Number field, text field, and select */}
            <div className={`${ifType  ? 'flex items-center' : ' grid grid-cols-2'} w-full gap-1`}> 
                { children }
            </div>
        </div>
    )
}

export default ConfigItemWrapper;