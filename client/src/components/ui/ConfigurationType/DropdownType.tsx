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
            <div onClick={()=>setDropdownOpen(false)} className='absolute inset-0'/>
            <div className="relative flex items-center w-full">
                <button onClick={()=>setDropdownOpen(open=>!open)} className="flex items-center justify-between w-full p-[1rem] border border-[#292929]/15 hover:border-[#292929]/35 active:border-[#292929]/15 cursor-pointer">
                    <span className="text-[16px] text-[#292929] font-bold leading-none">{selectedOption}</span>
                    <Arrow className='size-5 -rotate-90' color='#292929' />
                </button>

                

                {/* Selections */}
                {dropdownOpen && (
                    <div className='absolute top-[100%] flex flex-col w-full bg-[#fff] shadow-md z-20'>

                        {/* This button is mapped later */}
                        <button onClick={()=>handleSelectOption('Select name 1')} className='flex items-center justify-between w-full p-[1rem] border-x border-[#292929]/15 hover:bg-[#B1B2B5]/25 active:bg-transparent cursor-pointer'>
                            <span className='text-[16px] text-[#292929] font-bold leading-none'>Select name 1</span>
                        </button>

                    </div>
                )}
            </div>
        </>
    ) 
}

export default DropdownType;