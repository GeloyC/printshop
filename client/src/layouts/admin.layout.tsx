import { Outlet } from "react-router-dom"
import NavbarAdmin from "../components/navbarAdmin"
import TopNavAdmin from "../components/topnavAdmin"


function AdminLayout () {

    return (
        <div className="grid grid-cols-[1fr_6fr] gap-[1rem] w-full h-full px-[1rem] bg-[#f2f2f2]">
            <NavbarAdmin  />

            <div className="flex flex-col w-full h-screen">
                <TopNavAdmin />
                <Outlet />
            </div>
        </div>
    )
}


export default AdminLayout