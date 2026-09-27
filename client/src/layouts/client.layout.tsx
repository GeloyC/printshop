import { Outlet } from "react-router-dom"
import NavBar from "../components/client/NavBar/navbar"

function ClientLayout () {

    return (
        <div className="relative flex flex-col w-full h-screen items-center bg-[#fff] px-[12rem]">
            <NavBar />
            <Outlet />
        </div>
    )
}   

export default ClientLayout