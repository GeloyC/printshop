import { Link } from "react-router-dom";
import { useState } from "react";

// icons
import Arrow from '/src/assets/icon/arrow-no-tail.svg?react'
import Home from '/src/assets/icon/home.svg?react'

import ModalWrapper from "../../wrapper/ModalWrapper";
import Signup from "../../modal/client/Signup";
import Login from "../../modal/client/Login";
import FolderButton from "./FolderButton";
import NotificationButton from "./NotificationButton";
import { useUserContext } from "../../../context/userContext";
import UserAccountIcon from "./UserAccountIcon";
import CartButton from "./CartButton";

// hooks
import ServiceContainer from "./Services/ServiceContainer";
import { useServiceNames } from "../../../hooks/services/UseServiceNames";
import { useCartContext } from "../../../context/cartContext";

function NavBar () {

    const { user } = useUserContext();
    const {data: serviceNames = [] } = useServiceNames();
    const { items } = useCartContext();

    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [signupOpen, setSignupOpen] = useState<boolean>(false);

    const [isServoceDropdownOpen, setIsServiceDropdownOpen] = useState<boolean>(false);
    const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState<boolean>(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState<boolean>(false);

    const handleCloseDropdowns = () => {
        setIsNotifDropdownOpen(false);
        setIsAccountDropdownOpen(false);
        setIsServiceDropdownOpen(false);

        console.log('clicked');
    }

    


    
    return (
        <>
            {(isNotifDropdownOpen || isAccountDropdownOpen || isServoceDropdownOpen) && (
                <div onClick={handleCloseDropdowns} className="fixed inset-0 z-10"/>
            )}
            <section className="sticky top-0 backdrop-blur grid grid-cols-3 w-full h-[4rem] py-[0.75rem]  z-10">

                <div className="flex w-full">
                    <Link to="/" onClick={handleCloseDropdowns} className="flex items-center bg-[#ffc36d]/50 hover:bg-[#ff6b00] px-[0.5rem] gap-[0.3rem] rounded-[10px]">
                        <Home className="size-5" color="#fff"/>
                        <span className="text-[16px] text-[#fff] font-bold">Home</span>
                    </Link>
                </div>


                <div className="flex items-center justify-center w-full h-full gap-[1rem]">
                    <button onClick={()=>setIsServiceDropdownOpen(true)} className="relative flex items-center h-full bg-[#cc4c02] hover:bg-[#ffc36d]/50 gap-[1rem] px-[1rem] rounded-[10px] text-[#272727] cursor-pointer transition-all duration-200">
                        <span className="text-xl font-bold text-[#fff]">PRINT SHOP</span>
                        <Arrow className="size-6 rotate-270" color="#fff"/>
                    </button>

                    {isServoceDropdownOpen && (
                        <ServiceContainer
                            handleCloseDropdowns={handleCloseDropdowns}
                            serviceNames={serviceNames}
                        />
                    )}
                </div>


                <div className="relative flex items-center justify-end w-full h-full gap-[0.5rem]">
                    <CartButton 
                        closeDropdowns={handleCloseDropdowns}
                        itemCount={items.length}
                    />

                    <FolderButton 
                        closeDropdowns={handleCloseDropdowns}
                    />
                    <NotificationButton 
                        isNotifDropdownOpen={isNotifDropdownOpen}
                        setIsNotifDropdownOpen={setIsNotifDropdownOpen}
                        closeAccount={()=>setIsAccountDropdownOpen(false)}
                    />

                    {user ? (
                        <UserAccountIcon 
                            user={user}
                            setIsAccountDropdownOpen={setIsAccountDropdownOpen}
                            isAccountDropdownOpen={isAccountDropdownOpen}
                            closeNotif={()=>setIsNotifDropdownOpen(false)}
                        />
                    ):(
                        <>
                            <button onClick={()=>{
                                setLoginOpen(true)
                                handleCloseDropdowns()
                            }} className="bg-[#f2f2f2] hover:bg-[#B1B2B5]/50 active:bg-[#f2f2f2] px-[1rem] py-[0.5rem] rounded-[5px] cursor-pointer transition-all duration-100">
                                <span className="px-[1rem] text-[14px] font-[600]">Login</span>
                            </button>
                            <button onClick={()=>{
                                setSignupOpen(true)
                                handleCloseDropdowns()
                            }} className="border border-[#ff6b00] bg-[#ff6b00] hover:bg-[#e76100] active:bg-[#ff6b00] px-[1rem] py-[0.5rem] rounded-[5px] cursor-pointer transition-all duration-100">
                                <span className="text-[#FFF] text-[14px] font-[600]">Get Started</span>
                            </button>
                        </>
                    )}
                </div>

            </section>


            {signupOpen && (
                <ModalWrapper>
                    <Signup 
                        close={()=>setSignupOpen(false)}
                    />
                </ModalWrapper>
            )}

            {loginOpen && (
                <ModalWrapper>
                    <Login 
                        close={()=>setLoginOpen(false)}
                        setSignupOpen={setSignupOpen}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default NavBar; 