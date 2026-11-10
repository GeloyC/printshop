import { Link, useLocation } from "react-router-dom";

// icon
import Service from '/src/assets/icon/service.svg?react'
import Orders from '/src/assets/icon/orders.svg?react'


function NavbarAdmin () {

    const location = useLocation();

    return (
        <div className={`relative flex flex-col h-full items-center justify-between bg-[#fafafa] border-r border-[#292929]/15`}>
            
            <div className={`sticky top-0 flex flex-col w-full `}>
                <div className="flex flex-col items-start p-[0.5rem] gap-[0.3rem]">
                    <Link to="/admin/service" 
                        className={`
                            flex items-center justify-start w-full hover:bg-[#fff0d3] active:bg-[#ffdca5] rounded-[10px] p-[0.75rem] gap-[0.5rem]
                            ${location.pathname === '/admin/service' && 'bg-[#fff0d3]'}
                        `}
                    >
                        <Service className={`size-5`} />
                        <span className={`text-md text-[#292929] font-[800]`}>
                            Service
                        </span>
                    </Link>

                    <Link to="/admin/orders" 
                        className={`
                            flex items-center jsutify-start w-full hover:bg-[#fff0d3] active:bg-[#ffdca5] rounded-[10px] p-[0.75rem] gap-[0.5rem]
                            ${location.pathname === '/admin/orders' && 'bg-[#fff0d3]'}
                        `}
                    >
                        <Orders className={`size-5`} />
                        <span className={`text-md text-[#292929] font-[800]`}>
                            Orders
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default NavbarAdmin;