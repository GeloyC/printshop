import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

// icon
import Service from '/src/assets/icon/service.svg?react'
import Orders from '/src/assets/icon/orders.svg?react'
import AdminUserIcon from "./AdminUserIcon";
import { useUserContext } from "../../../context/userContext";


function NavbarAdmin () {

    const location = useLocation();

    const {user} = useUserContext();
    const [dropdown, setDropdown] = useState<boolean>(false);

    return (
        <div className={`relative flex flex-col h-full items-start justify-between bg-[#fafafa] border-r border-[#292929]/15`}>
            <div className={`sticky top-0 flex flex-col w-full `}>
                <div className={`flex items-center justify-start h-[3.5rem] w-full p-[0.5rem] px-[1rem] gap-[0.5rem] border-b border-[#292929]/15`}>
                    <span className="font-bold text-lg text-[#292929] leading-none">Admin PrintShop</span> 
                </div>

                <div className="flex flex-col items-start p-[0.5rem] gap-[0.3rem]">
                    <Link to="/admin/service" 
                        className={`
                            group flex items-center justify-start w-full hover:bg-[#e6e6e6] active:bg-[#ffdca5] rounded-[5px] p-[0.5rem] gap-[0.5rem]
                            ${location.pathname === '/admin/service' && 'bg-[#e6e6e6]'}
                        `}
                    >
                        <Service className={`size-4 opacity-50 group-hover:opacity-100 transition-all duration-200`} />
                        <span className={`text-sm text-[#292929] font-[600]`}>
                            Service
                        </span>
                    </Link>

                    <Link to="/admin/orders" 
                        className={`
                            group flex items-center jsutify-start w-full hover:bg-[#e6e6e6] active:bg-[#ffdca5] rounded-[5px] p-[0.5rem] gap-[0.5rem]
                            ${location.pathname === '/admin/orders' && 'bg-[#e6e6e6]'}
                        `}
                    >
                        <Orders className={`size-4 opacity-50 group-hover:opacity-100 transition-all duration-200`} />
                        <span className={`text-sm text-[#292929] font-[600]`}>
                            Orders
                        </span>
                    </Link>
                </div>
            </div>

            <div className="flex items-center w-full h-[3.5rem] border-t border-[#292929]/15">
                <AdminUserIcon 
                    user={user}
                    dropdown={dropdown}
                    setDropdown={setDropdown}
                />
            </div>
        </div>
    )
}


export default NavbarAdmin;