
// icons
import { useEffect, type SetStateAction } from 'react'
import Warning from '/src/assets/icon/warning.svg?react'

type DeleteItemFromCartAlertProp = {
    filename?: string
    closeAlert: () => void
    setSkipDeleteConfirmation: React.Dispatch<SetStateAction<boolean>>
    skipDeleteConfirmation: boolean,
    handleDeleteItem: () => void
}

function DeleteItemFromCartAlert ({
    filename,
    closeAlert,
    setSkipDeleteConfirmation,
    skipDeleteConfirmation,
    handleDeleteItem
}: DeleteItemFromCartAlertProp) {


    return (
        <div className="relative fade-up flex flex-col items-center gap-[1rem] w-auto p-[2rem] pt-[2.5rem] rounded-[5px] bg-[#fff]">
            
            <div className='absolute left-1/2 -translate-x-1/2 -top-7 bg-[#fff] rounded-full p-[0.5rem]'>
                <Warning className="size-10" />
            </div>

            <span className="text-[20px] text-[#292929] text-center font-bold w-[350px] text-wrap leading-none">Delete <strong className='text-[#ff6b00]'>{filename}</strong> from cart?</span>

            <p className='text-[14px] text-[#292929] text-center opacity-75 w-[350px] text-wrap'>Just add an instruction/caution here later. Make it a bit long but not too long, ok?</p>

            <div className='flex items-center justify-center w-full gap-[0.3rem] mt-[1rem]'>
                <button onClick={closeAlert} className='w-[150px] rounded-[5px] py-[0.5rem] bg-[#f2f2f2] hover:bg-[#B1B2B5]/50 active:bg-transparent transition-all duration-100 cursor-pointer'>
                    <span className='text-[16px] text-[#292929] font-[600]'>Cancel</span>
                </button>
                <button onClick={handleDeleteItem} className='w-[150px] rounded-[5px] py-[0.5rem] bg-[#ff0000] hover:bg-[#d50000] active:bg-[#ff0000] cursor-pointer'>
                    <span className='text-[16px] text-[#fff] font-[600]'>Delete</span>
                </button>
            </div>

            <div className='flex items-center gap-[0.3rem]'>
                <input type="checkbox" name="dont-show-check" id="dont-show-check" checked={skipDeleteConfirmation} 
                onChange={(e)=>setSkipDeleteConfirmation(e.target.checked)}
                className="cursor-pointer"/>
                <label htmlFor="dont-show-check"
                className='text-[14px] font-bold text-[#292929] leading-none opacity-75'>
                    Don't show this again.
                </label>
            </div>
        </div>
    )
}

export default DeleteItemFromCartAlert;