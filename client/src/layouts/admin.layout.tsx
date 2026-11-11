import { Outlet } from "react-router-dom"
import NavbarAdmin from "../components/admin/NavBarAdmin/navbarAdmin"
import TopNavAdmin from "../components/admin/NavBarAdmin/topnavAdmin"


function AdminLayout () {

    return (
        <div className="flex flex-col items-start w-full h-screen bg-[#fafafa]">
            {/* <TopNavAdmin /> */}

            <div className="grid grid-cols-[15%_85%] w-full h-full overflow-y-auto thin-scrollbar">
                <NavbarAdmin />
                <Outlet />
            </div>
        </div>
    )
}


export default AdminLayout