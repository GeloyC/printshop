import { Outlet } from "react-router-dom"
import NavbarAdmin from "../components/admin/NavBarAdmin/navbarAdmin"
import TopNavAdmin from "../components/admin/NavBarAdmin/topnavAdmin"

import { useState } from "react"


function AdminLayout () {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-start w-full h-screen">
            <TopNavAdmin />

            <div className="flex w-full h-screen bg-[#B1B2B5]/50 pr-[1rem]">
                <NavbarAdmin  
                    setIsExpanded={setIsExpanded}
                    isExpanded={isExpanded}
                />

                <div className="flex w-full h-full rounded-t-[15px] border-t border-x border-[#292929]/15 overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default AdminLayout