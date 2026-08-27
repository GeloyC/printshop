import { Outlet } from "react-router-dom"
import NavbarAdmin from "../components/navbarAdmin"
import TopNavAdmin from "../components/topnavAdmin"


function AdminLayout () {

    return (
        <div className="relative grid grid-cols-[1fr_6fr] w-full h-screen bg-[#fff0d3]">

            <NavbarAdmin  />

            <div className="flex flex-col w-full h-full">
                <TopNavAdmin />
                <Outlet />
            </div>
        </div>
    )
}


export default AdminLayout