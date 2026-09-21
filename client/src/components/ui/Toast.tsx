
// icons
import Warning from '/src/assets/icon/warning.svg?react'

type ToastProp = { message: string }

function Toast ({ message }: ToastProp) {

    return (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-12 toast-pop flex items-center justify-center min-w-[150px] gap-[0.3rem] p-[0.3rem] px-[0.5rem] border-2 border-[#FFFF00] bg-[#FFFF00] rounded-[5px] shadow-lg">
            <Warning className='size-5' color='#292929'/>
            <span className="text-[#292929] text-[14px] font-[700] text-nowrap leading-none">{message}</span>
        </div>
    )
}

export default Toast