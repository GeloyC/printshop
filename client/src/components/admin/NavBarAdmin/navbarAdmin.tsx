import type { SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";

// icon
import Expand from '/src/assets/icon/arrow-no-tail.svg?react'
import Service from '/src/assets/icon/service.svg?react'
import Orders from '/src/assets/icon/orders.svg?react'

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
        <div className={`relative flex flex-col ${isExpanded ? 'w-[4rem]' : 'w-[15rem]'} h-full min-h-0 items-center justify-between transition-all duration-200`}>
            
            <div className={`sticky top-0 flex flex-col ${isExpanded && 'items-start'} w-full`}>
                <div className="flex flex-col items-start px-[0.5rem] gap-[0.3rem] min-w-[4rem]">
                    <Link to="/admin/service" 
                    className={`flex items-center ${isExpanded ? 'justify-center h-[2rem] pl-[0.5rem]' : 'justify-start h-[2rem] pl-[0.5rem]'} gap-[0.5rem] w-full ${location.pathname === '/admin/service' && 'bg-[#B1B2B5]/75'} hover:bg-[#B1B2B5]/50 active:bg-[#B1B2B5]/75 rounded-[5px] transition-all duration-200 `}>
                        <Service className="h-[20px] w-[30px]" />
                        <span className={`text-[16px] text-[#292929] font-bold ${isExpanded ? 'opacity-0 w-0' : 'opacity-100 w-25'} transition-all duration-200`}>Service</span>
                    </Link>

                    <Link to="/admin/service" 
                    className={`flex items-center ${isExpanded ? 'justify-center h-[2rem] pl-[0.5rem]' : 'justify-start h-[2rem] pl-[0.5rem]'} gap-[0.5rem] w-full ${location.pathname === '/admin/orders' && 'bg-[#B1B2B5]/75'} hover:bg-[#B1B2B5]/50 active:bg-[#B1B2B5]/75 rounded-[5px] transition-all duration-200`}>
                        <Orders className="h-[20px] w-[30px]" />
                        <span className={`text-[16px] text-[#292929] font-bold ${isExpanded ? 'opacity-0 w-0' : 'opacity-100 w-25'} transition-all duration-200`}>Orders</span>
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