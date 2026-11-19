import { useLocation, useNavigate,  type SetURLSearchParams } from "react-router-dom";

type StatusTablProp = {
    setSearchParams: SetURLSearchParams
    status: string
}

function StatusTab ({ setSearchParams, status }: StatusTablProp) {


    return (
        <div className="flex items-center">

            <button onClick={() => setSearchParams({ status: '' })} 
                className={`relative group flex items-center justify-center bg-gradient-to-b p-[0.5rem] px-[1rem] min-w-[100px] cursor-pointer rounded-t-[15px] ${status === '' ? 'from-[#ffc36d] via-[#ffc36d] to-[#fff8ec] border-t-2 border-[#ff6b00] -translate-y-2' : 'translate-y0 from-transparent border-t-2 border-[#fff8ec]'} transition-all duration-100`}
            >
                <span className={`text-[16px] text-[#292929] font-bold transition-all duration-100`}>
                    All
                </span>

            </button>

            <button onClick={() => setSearchParams({ status: 'Order placed' })} 
                className={`
                relative group flex items-center justify-center bg-gradient-to-b rounded-t-[15px] p-[0.5rem] px-[1rem] min-w-[100px] cursor-pointer ${status === 'Order placed' ? 'from-[#ffc36d] via-[#ffc36d] to-[#fff8ec] border-t-2 border-[#ff6b00] -translate-y-2' : 'translate-y0 from-transparent border-t-2 border-[#fff8ec]'} transition-all duration-100`}
            > 
                <span className={`text-[16px] text-[#292929] font-bold transition-all duration-100`}>
                    Order placed
                </span>
            </button>

            <button onClick={() => setSearchParams({ status: 'Order confirmed' })} 
                className={`relative group flex items-center justify-center bg-gradient-to-b py-[0.5rem] px-[1rem] min-w-[100px] rounded-t-[15px] cursor-pointer ${status === 'Order confirmed' ? 'from-[#ffc36d] via-[#ffc36d] to-[#fff8ec] border-t-2 border-[#ff6b00] -translate-y-2' : 'translate-y0 from-transparent border-t-2 border-[#fff8ec]'} transition-all duration-100`}
            >
                <span className={`text-[16px] text-[#292929] font-bold transition-all duration-100`}>
                    Order confirmed
                </span>

            </button>

            <button onClick={() => setSearchParams({ status: 'Processing' })} 
                className={`relative group flex items-center justify-center bg-gradient-to-b py-[0.5rem] px-[1rem] min-w-[100px] rounded-t-[15px] cursor-pointer ${status === 'Processing' ? 'from-[#ffc36d] via-[#ffc36d] to-[#fff8ec] border-t-2 border-[#ff6b00] -translate-y-2' : 'translate-y0 from-transparent border-t-2 border-[#fff8ec]'} transition-all duration-100`}
            >
                <span className={`text-[16px] text-[#292929] font-bold transition-all duration-100`}>
                    Processing
                </span>
            </button>

            <button onClick={() => setSearchParams({ status: 'Ready-for-pickup' })} 
                className={`relative group flex items-center justify-center bg-gradient-to-b py-[0.5rem] px-[1rem] min-w-[100px] rounded-t-[15px] cursor-pointer ${status === 'Ready-for-pickup' ? 'from-[#ffc36d] via-[#ffc36d] to-[#fff8ec] border-t-2 border-[#ff6b00] -translate-y-2' : 'translate-y0 from-transparent border-t-2 border-[#fff8ec]'} transition-all duration-100`}
            >
                <span className={`text-[16px] text-[#292929] font-bold transition-all duration-100`}>
                    Ready-for-pickup
                </span>
            </button>

            <button onClick={() => setSearchParams({ status: 'Completed' })} 
                className={`relative group flex items-center justify-center min-w-[100px] py-[0.5rem] px-[1rem] bg-gradient-to-b rounded-t-[15px] cursor-pointer ${status === 'Completed' ? 'from-[#ffc36d] via-[#ffc36d] to-[#fff8ec] border-t-2 border-[#ff6b00] -translate-y-2' : 'translate-y0 from-transparent border-t-2 border-[#fff8ec]'} transition-all duration-100`}
            >
                <span className={`text-[16px] text-[#292929] font-bold transition-all duration-100`}>
                    Completed
                </span>

            </button>
        </div>
    )
}

export default StatusTab;