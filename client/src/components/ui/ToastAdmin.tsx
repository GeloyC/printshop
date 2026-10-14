
import Info from '/src/assets/icon/exclamation-mark.svg?react'

type AdminToastProp = {
    message: string,
    color?: string
}

function AdminToast ({
    message,
    color = '#fff600'
}: AdminToastProp) {

    return (
        <div className="toast-pop absolute bottom-10 right-15
        flex items-start justify-start gap-[0.5rem] min-w-[150px] max-w-[300px] p-[0.75rem] rounded-[5px]"
        style={{
            backgroundColor: `${color}`
        }}
        >
            <Info className='size-15 p-[0.3rem] h-6 w-6 bg-[#fff] rounded-full' />
            <span className="text-[14px] text-wrap font-bold text-[#292929] leading-none">{message}</span>
        </div>
    )
}

export default AdminToast;