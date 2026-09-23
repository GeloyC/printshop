
// icons
import Warning from '/src/assets/icon/warning.svg?react'

type DeleteItemFromCartAlertProp = {
    file?: File
    closeAlert: () => void
}

function DeleteItemFromCartAlert ({
    file,
    closeAlert
}: DeleteItemFromCartAlertProp) {



    return (
        <div className="relative fade-up flex flex-col items-start gap-[1rem] w-auto p-[2rem] pt-[2.5rem] rounded-[5px] bg-[#fff]">
            
            <div className='absolute left-1/2 -translate-x-1/2 -top-7 bg-[#fff] rounded-full p-[0.5rem]'>
                <Warning className="size-10" />
            </div>

            <span className="text-[20px] text-[#292929] font-bold leading-none">Delete <strong className='text-[#ff6b00]'>{file?.name}</strong> from cart?</span>

            <p className='text-[14px] text-[#292929] opacity-75 w-[350px] text-wrap'>Just add an instruction/caution here later. Make it a bit long but not too long, ok?</p>

            <div className='flex items-center justify-end w-full gap-[0.3rem] mt-[1rem]'>
                <button onClick={closeAlert} className='w-[150px] rounded-[5px] py-[0.5rem] bg-[#f2f2f2] hover:bg-[#B1B2B5]/50 active:bg-transparent transition-all duration-100 cursor-pointer'>
                    <span className='text-[16px] text-[#292929] font-[600]'>Cancel</span>
                </button>
                <button className='w-[150px] rounded-[5px] py-[0.5rem] bg-[#ff0000] cursor-pointer'>
                    <span className='text-[16px] text-[#fff] font-[600]'>Delete</span>
                </button>
            </div>
        </div>
    )
}

export default DeleteItemFromCartAlert;