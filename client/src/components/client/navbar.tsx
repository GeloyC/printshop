import { Link } from "react-router-dom";

import Arrow from '/src/assets/icon/arrow-no-tail.svg?react'
import { useState } from "react";
import ModalWrapper from "../wrapper/ModalWrapper";
import Signup from "../modal/client/Signup";
import Login from "../modal/client/Login";

function NavBar () {

    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [signupOpen, setSignupOpen] = useState<boolean>(false);
    
    return (
        <>
            <section className="sticky top-0 backdrop-blur flex w-full items-center justify-between h-[4rem] py-[0.75rem] z-10">
                <div className="flex items-center h-full gap-[1rem]">
                    <Link to="/" className="text-[#ff6b00] font-bold">PRINT SHOP</Link>

                    <div className="group relative flex h-full">
                        <div className="flex h-full items-center cursor-pointer">
                            <div className="flex items-center gap-[0.2rem] px-[1rem] py-[0.5rem] hover:bg-[#B1B2B5]/25 rounded-[5px] text-[#272727]">
                                <span className="font-bold text-[#272727]">Services</span>
                                <Arrow className="size-5 rotate-270 group-hover:rotate-90 transition-all duration-100"/>
                            </div>
                        </div>

                        <div className="fade-up absolute top-[2.5rem] left-1/2 -translate-x-1/2 p-[0.2rem] hidden group-hover:flex flex flex-col items-start shadow-lg bg-[#FFF] border border-[#272727]/10">
                            <Link to="/service/slug" className="whitespace-nowrap py-[0.5rem] px-[1rem] hover:bg-[#B1B2B5]/25 active:bg-[#B1B2B5]/35">Document Print</Link>
                        </div>
                    </div>
                </div>

                <div className="flex items-center h-full gap-[0.2rem]">
                    <Link to="/admin/service">Temporary admin button</Link>
                    <button onClick={()=>setLoginOpen(true)} className="bg-[#f2f2f2] hover:bg-[#B1B2B5]/50 active:bg-[#f2f2f2] px-[1rem] py-[0.5rem] rounded-[5px] cursor-pointer transition-all duration-100">
                        <span className="px-[1rem] text-[14px] font-[600]">Login</span>
                    </button>
                    <button onClick={()=>setSignupOpen(true)} className="border border-[#ff6b00] bg-[#ff6b00] hover:bg-[#e76100] active:bg-[#ff6b00] px-[1rem] py-[0.5rem] rounded-[5px] cursor-pointer transition-all duration-100">
                        <span className="text-[#FFF] text-[14px] font-[600]">Get Started</span>
                    </button>
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