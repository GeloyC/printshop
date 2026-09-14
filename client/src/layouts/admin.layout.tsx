import { Outlet } from "react-router-dom"
import NavbarAdmin from "../components/admin/navbarAdmin"
import TopNavAdmin from "../components/admin/topnavAdmin"

import { useState } from "react"


function AdminLayout () {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <div className="flex items-start w-full h-screen bg-[#d6d6d6]">
            <NavbarAdmin  
                setIsExpanded={setIsExpanded}
                isExpanded={isExpanded}
            />

            <div className="flex flex-col w-full h-screen">
                <TopNavAdmin />
                <Outlet />
            </div>
        </div>
    )
}


export default AdminLayout