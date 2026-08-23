import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar"

function ClientLayout () {

    return (
        <div className="relative flex flex-col w-full items-center">
            <NavBar />
            <Outlet />
        </div>
    )
}   

export default ClientLayout