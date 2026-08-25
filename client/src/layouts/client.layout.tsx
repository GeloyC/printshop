import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar"

function ClientLayout () {

    return (
        <div className="relative flex flex-col w-full h-screen items-center px-[16rem]">
            <NavBar />
            <Outlet />
        </div>
    )
}   

export default ClientLayout