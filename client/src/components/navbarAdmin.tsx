import { Link, useLocation } from "react-router-dom";


function NavbarAdmin () {

    const location = useLocation();

    return (
        <div className="relative flex flex-col w-full h-full min-h-0 items-start justify-between">
        
            <div className="sticky top-0 flex flex-col items-start w-full gap-[2rem] py-[1rem]">
                <span className="font-bold text-[24px] text-[#272727] leading-none">Admin Logo</span>

                <div className="flex flex-col w-full gap-[0.3rem]">
                    <Link to="/admin/service" className={`py-[0.3rem] ${location.pathname === '/admin/service' && 'bg-[#B1B2B5]/75'} hover:bg-[#B1B2B5]/50 active:bg-[#B1B2B5]/75 rounded-[5px] transition-all duration-100`}>
                        <span className="text-[16px] text-[#292929] font-bold px-[1rem]">Service</span>
                    </Link>

                    <Link to="/admin/service" className={`py-[0.3rem] ${location.pathname === '/admin/orders' && 'bg-[#B1B2B5]/75'} hover:bg-[#B1B2B5]/50 active:bg-[#B1B2B5]/75 rounded-[5px] transition-all duration-100`}>
                        <span className="text-[16px] text-[#292929] font-bold px-[1rem]">Orders</span>
                    </Link>


                </div>
            </div>
    
        </div>
    )
}


export default NavbarAdmin;