import { useState } from 'react';


// icons
import Arrow from '/src/assets/icon/arrow-no-tail.svg?react'

function DropdownType () {

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>('-- Select option --')

    const handleSelectOption = (name: string) => {
        setSelectedOption(name);
        setDropdownOpen(false);
    }

    return (
        <>
            <div className="relative flex items-center w-full ConfigurationOptions z-20">
                <button onClick={()=>setDropdownOpen(open=>!open)} className="flex items-center justify-between w-full p-[0.75rem] bg-[#f2f2f2]/50 border border-[#292929]/15 hover:border-[#292929]/35 active:border-[#292929]/15 cursor-pointer rounded-[5px]">
                    <span className="text-[14px] text-[#292929] font-bold leading-none">{selectedOption}</span>
                    <Arrow className='size-5 -rotate-90' color='#292929' />
                </button>

                

                {/* Selections */}
                {dropdownOpen && (
                    <div className='absolute top-[100%] flex flex-col w-full bg-[#fff] border border-[#292929]/25 shadow-md'>

                        {/* This button is mapped later */}
                        <button onClick={()=>handleSelectOption('Select name 1')} className='flex items-center justify-between w-full p-[1rem] hover:bg-[#B1B2B5]/25 active:bg-transparent cursor-pointer'>
                            <span className='text-[14px] text-[#292929] font-bold leading-none'>Select name 1</span>
                        </button>

                    </div>
                )}
            </div>
        </>
    ) 
}

export default DropdownType;