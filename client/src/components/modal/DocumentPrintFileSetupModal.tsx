import { useState } from 'react';

// icons
import Check from '/src/assets/icon/check.svg?react'

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
        <div className="fade-up flex flex-col min-w-[600px] rounded-[10px] bg-[#FFF] p-[2rem] gap-[1rem]">
            <span className="text-[24px] text-[#272727] font-bold leading-tight">{selectedFile}</span>
            
            <div className="flex flex-col w-full gap-[0.5rem]">
                <div className="flex flex-col w-full gap-[0.3rem] pb-[0.5rem] border-b border-dashed border-[#575757]/25">
                    <span className='text-[14px] font-bold text-[#575757]'>Variation</span>

                    <div className="flex items-center w-full gap-[0.3rem]">
                        <input type="radio" name="variation" id="var_black_&_white" hidden/>
                        <label htmlFor="var_black_&_white" className="flex items-center w-full gap-[0.3rem] bg-[#ffdca5] p-[0.5rem] px-[0.75rem] rounded-[10px] cursor-pointer">
                            <div className={`border-2 border-[#ff6b00] p-[0.1rem] rounded-[5px] bg-[#ff6b00]`}>
                                <Check className='size-3' color="#fff" />
                            </div>
                            <span className="px-[0.5rem] text-[#ff6b00] font-bold">Black & White</span>
                        </label>

                        <input type="radio" name="variation" id="var_colored" hidden/>
                        <label htmlFor="var_colored" className="flex items-center w-full gap-[0.3rem] bg-[#e6e6e6] p-[0.5rem] px-[0.75rem] rounded-[10px] cursor-pointer">
                            <div className={`border-2 border-[#767676] bg-[#FFF] p-[0.1rem] rounded-[5px]`}>
                                <Check className='size-3' color="#fff" />
                            </div>
                            <span className="px-[0.5rem] text-[#575757] font-bold">Colored</span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-[0.3rem] pb-[0.5rem] border-b border-dashed border-[#575757]/25">
                    <span className='text-[14px] font-bold text-[#575757]'>Size</span>

                    <div className="flex items-center w-full gap-[0.3rem]">
                        <input type="radio" name="size" id="size_short" hidden/>
                        <label htmlFor="size_short" className="flex items-center w-full gap-[0.3rem] bg-[#e6e6e6] p-[0.5rem] px-[0.75rem] rounded-[10px] cursor-pointer">
                            <div className={`border-2 border-[#767676] bg-[#FFF] p-[0.1rem] rounded-[5px]`}>
                                <Check className='size-3' color="#fff" />
                            </div>
                            <span className="px-[0.5rem] text-[#575757] font-bold">Short</span>
                        </label>

                        <input type="radio" name="size" id="size_long" hidden/>
                        <label htmlFor="size_long" className="flex items-center w-full gap-[0.3rem] bg-[#ffdca5] p-[0.5rem] px-[0.75rem] rounded-[10px] cursor-pointer">
                            <div className={`border-2 border-[#ff6b00] p-[0.1rem] rounded-[5px] bg-[#ff6b00]`}>
                                <Check className='size-3' color="#fff" />
                            </div>
                            <span className="px-[0.5rem] text-[#ff6b00] font-bold">Long</span>
                        </label>

                        <input type="radio" name="size" id="size_a4" hidden/>
                        <label htmlFor="size_a4" className="flex items-center w-full gap-[0.3rem] bg-[#e6e6e6] p-[0.5rem] px-[0.75rem] rounded-[10px] cursor-pointer">
                            <div className={`border-2 border-[#767676] bg-[#FFF] p-[0.1rem] rounded-[5px]`}>
                                <Check className='size-3' color="#fff" />
                            </div>
                            <span className="px-[0.5rem] text-[#575757] font-bold">A4</span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-[0.3rem] pb-[0.5rem] border-b border-dashed border-[#575757]/25">
                    <span className='text-[14px] font-bold text-[#575757]'>Quantity</span>

                    <div className="flex items-center w-full gap-[0.3rem]">
                        <button onClick={()=>setQuantity(count=> --count)} disabled={quantity === 1} className={`p-[0.5rem] px-[1rem] rounded-[5px] bg-[#e6e6e6] ${quantity > 1 ? 'active:bg-[#a5a5a5] cursor-pointer' : 'cursor-not-allowed' }  transition-all duration-100`}>-</button>
                        <input type="text" value={quantity} disabled name="" id="" className='text-center max-w-[50px] border-2 border-[#575757] rounded-[10px] focus:outline-none focus:border-[#ff810a] p-[0.5rem] text-[#272727] font-bold'/>
                        <button onClick={()=>setQuantity(count=> ++count)} className='p-[0.5rem] px-[1rem] rounded-[5px] bg-[#e6e6e6] active:bg-[#a5a5a5] cursor-pointer transition-all duration-100'>+</button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end w-full gap-[0.3rem]">
                <button className="p-[0.5rem] bg-[#272727] hover:bg-[#1a1a1a] active:bg-[#434343] rounded-[15px] cursor-pointer">
                    <span className="text-[#FFF] px-[1rem]">Save</span>
                </button>
                <button onClick={closeModal} className="p-[0.5rem] bg-[#f2f2f2] hover:bg-[#d6d6d6] active:bg-[#e6e6e6] rounded-[15px] cursor-pointer">
                    <span className="text-[#272727] px-[1rem]">Cancel</span>
                </button>
            </div>
        </div>
    )
}

export default DocumentPrintFileSetupModal