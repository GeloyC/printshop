import { Link, useLocation } from "react-router-dom";


function NavbarAdmin () {

    const location = useLocation();

    return (
        <div className="flex flex-col w-full items-start justify-between h-full p-[1rem]">
        
            <div className="flex flex-col items-start w-full gap-[1rem]">
                <span className="font-bold text-[18px] text-[#ff6b00] leading-none">Admin Logo</span>

                <div className="flex flex-col w-full gap-[0.3rem]">
                    <Link to="/admin/service" className={`py-[0.3rem] ${location.pathname === '/admin/service' && 'bg-[#ffc36d]'} hover:bg-[#ff9e32] active:bg-[#ff9e32]/75 rounded-[5px] transition-all duration-100`}>
                        <span className="text-[14px] text-[#82330c] font-bold px-[1rem]">Service</span>
                    </Link>


                </div>
            </div>
    
        </div>
    )
}


export default NavbarAdmin;