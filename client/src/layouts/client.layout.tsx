import { Outlet, useLocation } from "react-router-dom"
import NavBar from "../components/client/NavBar/navbar"

function ClientLayout () {

    const location = useLocation();

    return (
        <div className={`flex min-h-screen w-full flex-col items-center gap-[1rem] px-[1rem] bg-[#fff8ec]`}>
            <NavBar />

            <div className="relative flex flex-1 w-full flex-col px-[12rem]">
                <Outlet />
            </div>
        </div>
    )
}   

export default ClientLayout