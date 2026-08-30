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
        <div className={`relative flex flex-col ${isExpanded ? 'w-[2.5rem]' : 'w-[15rem]'} h-full min-h-0 items-center justify-between pb-[1rem]`}>
            
            <div className={`sticky top-0 flex flex-col ${isExpanded && 'items-center'} w-full gap-[2rem] py-[1rem]`}>
                <div className={`flex ${isExpanded ? 'justify-center' : 'pl-[0.5rem] gap-[0.5rem]'} items-center`}>
                    <Logo className="h-[25px] w-[25px]" />
                    {!isExpanded && (
                        <span className="font-bold text-[24px] text-[#272727] leading-none">Admin</span>
                    )}
                </div>

                <div className="flex flex-col w-full gap-[0.3rem]">
                    <Link to="/admin/service" className={`flex items-center ${isExpanded ? 'justify-center' : 'pl-[0.5rem]'} gap-[0.5rem] w-full py-[0.5rem] ${location.pathname === '/admin/service' && 'bg-[#B1B2B5]/75'} hover:bg-[#B1B2B5]/50 active:bg-[#B1B2B5]/75 rounded-[5px] transition-all duration-100`}>
                        <Service className="h-[20px] w-[20px]" />
                        {!isExpanded && (
                            <span className="text-[16px] text-[#292929] font-bold ">Service</span>
                        )}
                    </Link>

                    <Link to="/admin/service" className={`flex items-center ${isExpanded ? 'justify-center' : 'pl-[0.5rem]'} gap-[0.5rem] py-[0.5rem] ${location.pathname === '/admin/orders' && 'bg-[#B1B2B5]/75'} hover:bg-[#B1B2B5]/50 active:bg-[#B1B2B5]/75 rounded-[5px] transition-all duration-100`}>
                        <Orders className="h-[20px] w-[20px]" />
                        {!isExpanded && (
                            <span className="text-[16px] text-[#292929] font-bold">Orders</span>
                        )}
                    </Link>


                </div>
            </div>

            <button onClick={()=>setIsExpanded(expand=>!expand)} className={`absolute bottom-5 -right-8 bg-[#fff] border border-[#292929]/50 p-1 hover:bg-[#B1B2B5]/50 active:bg-[#fff] cursor-pointer rounded-full transition-all duration-100 ${isExpanded && 'rotate-180'}`}>
                <Expand className="size-6" />
            </button>
    
        </div>
    )
}


export default NavbarAdmin;