
// icon
import Warning from '/src/assets/icon/warning.svg?react'

// component
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner'


type DeleteServiceAlertProp = {
    close: () => void,
    deleteService: () => void
    deletePending: boolean,
    name: string,
}

function DeleteServiceAlert ({
    close, 
    deleteService, 
    deletePending,
    name
}: DeleteServiceAlertProp) {

    return (
        <div className="fade-up relative flex flex-col min-w-[400px] bg-[#fff] rounded-[5px] gap-[1rem] p-[2rem]">
            <div className='absolute left-1/2 -translate-x-1/2 -top-7 bg-[#fff] rounded-full p-[0.5rem]'>
                <Warning className="size-10" />
            </div>

            <span className="text-[20px] text-[#292929] text-center font-bold w-[350px] text-wrap leading-none">Delete <strong className='text-[#ff6b00]'>{name}</strong> from cart?</span>

            <p className='text-[14px] text-[#292929] text-center opacity-75 w-[350px] text-wrap'>Just add an instruction/caution here later. Make it a bit long but not too long, ok?</p>

            <div className='flex items-center justify-center w-full gap-[0.3rem] mt-[1rem]'>
                <button onClick={close} className='w-[150px] rounded-[5px] py-[0.5rem] bg-[#f2f2f2] hover:bg-[#B1B2B5]/50 active:bg-transparent transition-all duration-100 cursor-pointer'>
                    <span className='text-[16px] text-[#292929] font-[600]'>Cancel</span>
                </button>
                <button onClick={deleteService} className='flex items-center justify-center gap-[0.3rem] w-[150px] rounded-[5px] py-[0.5rem] bg-[#ff0000] hover:bg-[#d50000] active:bg-[#ff0000] cursor-pointer'>
                    <span className='text-[16px] text-[#fff] font-[600]'>Delete</span>
                    {deletePending && (
                        <LoadingSpinner 
                            size={15}
                            color='#fff'
                        />
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteServiceAlert;