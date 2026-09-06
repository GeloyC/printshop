import type { SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";

// icon
import Expand from '/src/assets/icon/arrow-no-tail.svg?react'
import Service from '/src/assets/icon/service.svg?react'
import Orders from '/src/assets/icon/orders.svg?react'
import Logo from '/src/assets/icon/mock-logo.svg?react' // remove this later

interface NavProp {
    setIsExpanded: React.Dispatch<SetStateAction<boolean>>;
    isExpanded: boolean;
}

function NavbarAdmin ({
    setIsExpanded,
    isExpanded
} : NavProp) {

    const location = useLocation();

    return (
        <div className={`relative flex flex-col ${isExpanded ? 'w-[3rem]' : 'w-[15rem]'} h-full min-h-0 items-center justify-between`}>
            
            <div className={`sticky top-0 flex flex-col ${isExpanded && 'items-center'} w-full`}>
                <div className={`flex ${isExpanded ? 'justify-center w-[3rem]' : 'pl-[0.5rem] gap-[0.5rem]'} h-[3rem] max-h-[3rem] items-center bg-[#fff]`}>
                    <Logo className="h-[20px] w-[30px]" />
                    {!isExpanded && (
                        <span className="font-bold text-[16px] text-[#272727] leading-none">Admin</span>
                    )}
                </div>

                <div className="flex flex-col w-full">
                    <Link to="/admin/service" className={`flex items-center ${isExpanded ? 'justify-center w-[3rem] h-[3rem]' : 'pl-[0.5rem]'} gap-[0.5rem] w-full h-[3rem] ${location.pathname === '/admin/service' && 'bg-[#B1B2B5]/75'} hover:bg-[#B1B2B5]/50 active:bg-[#B1B2B5]/75 transition-all duration-100`}>
                        <Service className="h-[20px] w-[30px]" />
                        {!isExpanded && (
                            <span className="text-[16px] text-[#292929] font-bold ">Service</span>
                        )}
                    </Link>

                    <Link to="/admin/service" className={`flex items-center ${isExpanded ? 'justify-center w-[3rem] h-[3rem]' : 'pl-[0.5rem]'} gap-[0.5rem] h-[3rem] ${location.pathname === '/admin/orders' && 'bg-[#B1B2B5]/75'} hover:bg-[#B1B2B5]/50 active:bg-[#B1B2B5]/75 transition-all duration-100`}>
                        <Orders className="h-[20px] w-[30px]" />
                        {!isExpanded && (
                            <span className="text-[16px] text-[#292929] font-bold">Orders</span>
                        )}
                    </Link>


                </div>
            </div>

            <button onClick={()=>setIsExpanded(expand=>!expand)} className={`absolute bottom-5 -right-4 bg-[#fff] border border-[#292929]/50 p-1 hover:bg-[#B1B2B5]/50 active:bg-[#fff] cursor-pointer rounded-full transition-all duration-100 ${isExpanded && 'rotate-180'}`}>
                <Expand className="size-6" />
            </button>
    
        </div>
    )
}


export default NavbarAdmin;