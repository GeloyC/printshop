import { useState } from 'react';

// icons
import Check from '/src/assets/icon/check.svg?react'
import CheckboxType from '../../ui/ConfigurationType/CheckboxType';
import ConfigItemWrapper from '../../wrapper/ConfigItemWrapper';
import RadioType from '../../ui/ConfigurationType/RadioType';
import DropdownType from '../../ui/ConfigurationType/DropdownType';

interface ModalProp {
    selectedFile: string | null
    closeModal: () => void;
}

function DocumentPrintFileSetupModal ({ 
    selectedFile,
    closeModal 
}: ModalProp ) {

    const [quantity, setQuantity] = useState<number>(1);

    return (
        <div className="fade-up flex flex-col w-[600px] bg-[#FFF] p-[2rem] gap-[1rem]">

            <span className='text-[20px] text-[#292929] font-bold leading-none'>Setting Up the document</span>

            <div className='flex flex-col w-full '>
                <span className='text-[14px] font-bold text-[#575757]'>File</span>
                <span className="text-[16px] text-[#292929] font-bold leading-none p-[1rem] border border-[#ffdca5] bg-[#fff0d3]">{selectedFile}</span>
            </div>


            <div className="flex flex-col w-full gap-[1rem]">
                <span className='text-[18px] text-[#292929] font-bold leading-none'>Configuration</span>

                <ConfigItemWrapper configLabel='Checkbox'>
                    <CheckboxType />
                </ConfigItemWrapper>

                <ConfigItemWrapper configLabel='Radio'>
                    <RadioType />
                </ConfigItemWrapper>

                <ConfigItemWrapper configLabel='Dropdown'>
                    <DropdownType />
                </ConfigItemWrapper>

                

                {/* <div className="flex flex-col w-full gap-[0.3rem] pb-[0.5rem]">
                    <span className='text-[14px] font-bold text-[#575757]'>Quantity</span>

                    <div className="flex items-center w-full gap-[0.3rem]">
                        <button onClick={()=>setQuantity(count=> --count)} disabled={quantity === 1} className={`p-[0.5rem] px-[1rem] rounded-[5px] bg-[#e6e6e6] ${quantity > 1 ? 'active:bg-[#a5a5a5] cursor-pointer' : 'cursor-not-allowed' }  transition-all duration-100`}>-</button>
                        <input type="text" value={quantity} disabled name="" id="" className='text-center max-w-[50px] border-2 border-[#575757] rounded-[10px] focus:outline-none focus:border-[#ff810a] p-[0.5rem] text-[#272727] font-bold'/>
                        <button onClick={()=>setQuantity(count=> ++count)} className='p-[0.5rem] px-[1rem] rounded-[5px] bg-[#e6e6e6] active:bg-[#a5a5a5] cursor-pointer transition-all duration-100'>+</button>
                    </div>
                </div> */}
            </div>

            <div className="flex items-center justify-end w-full gap-[0.3rem] z-10">
                <button onClick={closeModal} className="p-[0.5rem] bg-[#f2f2f2] hover:bg-[#d6d6d6] active:bg-[#e6e6e6] cursor-pointer">
                    <span className="text-[#272727] px-[1rem]">Cancel</span>
                </button>
                <button className="p-[0.5rem] bg-[#272727] hover:bg-[#1a1a1a] active:bg-[#434343] cursor-pointer">
                    <span className="text-[#FFF] px-[1rem]">Save</span>
                </button>
            </div>
        </div>
    )
}

export default DocumentPrintFileSetupModal