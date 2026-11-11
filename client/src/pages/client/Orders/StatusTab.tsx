import { useLocation, useNavigate,  type SetURLSearchParams } from "react-router-dom";

type StatusTablProp = {
    setSearchParams: SetURLSearchParams
    status: string
}

function StatusTab ({ setSearchParams, status }: StatusTablProp) {


    return (
        <div className="flex items-center px-[2rem]">

            <button onClick={() => setSearchParams({ status: '' })} 
                className={`relative group flex items-center justify-center p-[0.5rem] px-[1rem] min-w-[100px] cursor-pointer rounded-t-[15px] ${status === '' ? 'bg-[#cc4c02] text-[#fff]' : 'bg-transparent text-[#292929]'}`}
            >
                <span className={`text-[16px] group-active:text-[#cc4c02] font-bold transition-all duration-100`}>
                    All
                </span>

                {status === '' && (
                    <>
                        <div className="absolute bottom-0 -right-[1rem] w-[1rem] h-[1rem] bg-[#cc4c02] z-10">
                            <div className="w-[1rem] h-[1rem] bg-[#ff6b00] rounded-bl-[15px] bg-[#fff8ec]" />
                        </div>
                        <div className="absolute bottom-0 -left-[1rem] w-[1rem] h-[1rem] bg-[#cc4c02]">
                            <div className="w-[1rem] h-[1rem] bg-[#ff6b00] rounded-br-[15px] bg-[#fff8ec]" />
                        </div>
                    </>
                )}

            </button>

            <button onClick={() => setSearchParams({ status: 'Order placed' })} 
                className={`
                relative group flex items-center justify-center rounded-t-[15px] p-[0.5rem] px-[1rem] min-w-[100px] cursor-pointer ${status === 'Order placed' ? 'bg-[#cc4c02] text-[#fff]' : 'bg-transparent text-[#292929]'}
                `}
            > 
                <span className={`text-[16px] group-active:text-[#cc4c02] font-bold transition-all duration-100`}>
                    Order placed
                </span>

                {status === 'Order placed' && (
                    <>
                        <div className="absolute bottom-0 -right-[1rem] w-[1rem] h-[1rem] bg-[#cc4c02] z-10">
                            <div className="w-[1rem] h-[1rem] bg-[#ff6b00] rounded-bl-[15px] bg-[#fff8ec]" />
                        </div>
                        <div className="absolute bottom-0 -left-[1rem] w-[1rem] h-[1rem] bg-[#cc4c02]">
                            <div className="w-[1rem] h-[1rem] bg-[#ff6b00] rounded-br-[15px] bg-[#fff8ec]" />
                        </div>
                    </>
                )}
            </button>

            <button onClick={() => setSearchParams({ status: 'Order confirmed' })} 
                className={`relative group flex items-center justify-center py-[0.5rem] px-[1rem] min-w-[100px] rounded-t-[15px] cursor-pointer ${status === 'Order confirmed' ? 'bg-[#cc4c02] text-[#fff]' : 'bg-transparent text-[#292929]'}`}
            >
                <span className={`text-[16px] group-active:text-[#cc4c02] font-bold transition-all duration-100`}>
                    Order confirmed
                </span>


                {status === 'Order confirmed' && (
                    <>
                        <div className="absolute bottom-0 -right-[1rem] w-[1rem] h-[1rem] bg-[#cc4c02] z-10">
                            <div className="w-[1rem] h-[1rem] bg-[#ff6b00] rounded-bl-[15px] bg-[#fff8ec]" />
                        </div>
                        <div className="absolute bottom-0 -left-[1rem] w-[1rem] h-[1rem] bg-[#cc4c02]">
                            <div className="w-[1rem] h-[1rem] bg-[#ff6b00] rounded-br-[15px] bg-[#fff8ec]" />
                        </div>
                    </>
                )}
            </button>

            <button onClick={() => setSearchParams({ status: 'Processing' })} 
                className={`relative group flex items-center justify-center py-[0.5rem] px-[1rem] min-w-[100px] rounded-t-[15px] cursor-pointer ${status === 'Processing' ? 'bg-[#cc4c02] text-[#fff]' : 'bg-transparent text-[#292929]'}`}
            >
                <span className={`text-[16px] group-active:text-[#cc4c02] font-bold transition-all duration-100`}>
                    Processing
                </span>

                
                {status === 'Processing' && (
                    <>
                        <div className="absolute bottom-0 -right-[1rem] w-[1rem] h-[1rem] bg-[#cc4c02] z-10">
                            <div className="w-[1rem] h-[1rem] bg-[#ff6b00] rounded-bl-[15px] bg-[#fff8ec]" />
                        </div>
                        <div className="absolute bottom-0 -left-[1rem] w-[1rem] h-[1rem] bg-[#cc4c02]">
                            <div className="w-[1rem] h-[1rem] bg-[#ff6b00] rounded-br-[15px] bg-[#fff8ec]" />
                        </div>
                    </>
                )}
            </button>

            <button onClick={() => setSearchParams({ status: 'Ready-for-pickup' })} 
                className={`relative group flex items-center justify-center py-[0.5rem] px-[1rem] min-w-[100px] rounded-t-[15px] cursor-pointer ${status === 'Ready-for-pickup' ? 'bg-[#cc4c02] text-[#fff]' : 'bg-transparent text-[#292929]'}`}
            >
                <span className={`text-[16px] group-active:text-[#cc4c02] font-bold transition-all duration-100`}>
                    Ready-for-pickup
                </span>


                {status === 'Ready-for-pickup' && (
                    <>
                        <div className="absolute bottom-0 -right-[1rem] w-[1rem] h-[1rem] bg-[#cc4c02] z-10">
                            <div className="w-[1rem] h-[1rem] bg-[#ff6b00] rounded-bl-[15px] bg-[#fff8ec]" />
                        </div>
                        <div className="absolute bottom-0 -left-[1rem] w-[1rem] h-[1rem] bg-[#cc4c02]">
                            <div className="w-[1rem] h-[1rem] bg-[#ff6b00] rounded-br-[15px] bg-[#fff8ec]" />
                        </div>
                    </>
                )}
            </button>

            <button onClick={() => setSearchParams({ status: 'Completed' })} 
                className={`relative group flex items-center justify-center py-[0.5rem] px-[1rem] min-w-[100px] rounded-t-[15px] cursor-pointer ${status === 'Completed' ? 'bg-[#cc4c02] text-[#fff]' : 'bg-transparent text-[#292929]'}`}
            >
                <span className={`text-[16px] group-active:text-[#cc4c02] font-bold transition-all duration-100`}>
                    Completed
                </span>


                {status === 'Completed' && (
                    <>
                        <div className="absolute bottom-0 -right-[1rem] w-[1rem] h-[1rem] bg-[#cc4c02] z-10">
                            <div className="w-[1rem] h-[1rem] bg-[#ff6b00] rounded-bl-[15px] bg-[#fff8ec]" />
                        </div>
                        <div className="absolute bottom-0 -left-[1rem] w-[1rem] h-[1rem] bg-[#cc4c02]">
                            <div className="w-[1rem] h-[1rem] bg-[#ff6b00] rounded-br-[15px] bg-[#fff8ec]" />
                        </div>
                    </>
                )}
            </button>
        </div>
    )
}

export default StatusTab;