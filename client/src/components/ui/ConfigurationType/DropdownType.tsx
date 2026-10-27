import { useEffect, useState, type SetStateAction } from 'react';


// icons
import Arrow from '/src/assets/icon/arrow-no-tail.svg?react'
import type { ConfigurationOptions } from '../../../types/service/service';
import type { SelectedOptions } from '../../modal/client/ConfigurationSetupModal';
import type { fileConfigType } from '../../../types/FileType';


type DropdownTypeProp = {
    options: ConfigurationOptions[]
    config: any
    selectedOptions: SelectedOptions
    setSelectedOptions: React.Dispatch<SetStateAction<SelectedOptions>>
}

function DropdownType ({ options, config, selectedOptions, setSelectedOptions }: DropdownTypeProp) {

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const handleSelectOption = (option: ConfigurationOptions) => {
        setSelectedOptions(prev => ({
            ...prev,
            [config.id]: [{
                id: option.id,
                category: config.label,
                option: option.option,
                price: option.price
            }]
        }))
    }

    return (
        <>
            <div className="relative flex items-center w-full ConfigurationOptions z-20">
                <button onClick={()=>setDropdownOpen(open=>!open)} className="flex items-center justify-between w-full p-[0.75rem] bg-[#f2f2f2]/50 border border-[#292929]/15 hover:border-[#292929]/35 active:border-[#292929]/15 cursor-pointer rounded-[5px]">
                    <span className="text-[14px] text-[#292929] font-bold leading-none">{selectedOptions[config.id]?.[0]?.option}</span>
                    <Arrow className='size-5 -rotate-90' color='#292929' />
                </button>

                

                {/* Selections */}
                {dropdownOpen && (
                    <div className='absolute top-[100%] flex flex-col w-full bg-[#fff] border border-[#292929]/25 shadow-md'>

                        {options.map(option => (
                            <button key={option.id}
                            onClick={()=>handleSelectOption(option)} className='flex items-center justify-between w-full p-[1rem] hover:bg-[#B1B2B5]/25 active:bg-transparent cursor-pointer'>
                                <span className='text-[14px] text-[#292929] font-bold leading-none'>{option.option}</span>
                            </button>
                        ))}

                    </div>
                )}
            </div>
        </>
    ) 
}

export default DropdownType;