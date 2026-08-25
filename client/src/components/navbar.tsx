import { Link } from "react-router-dom";

import Arrow from '/src/assets/icon/arrow-no-tail.svg?react'

function NavBar () {
    
    return (
        <section className="mt-[1rem] flex w-full items-center justify-between h-[4rem] px-[0.75rem] bg-[#fff] border border-[#272727]/15 rounded-[15px]">
            <div className="flex items-center h-full gap-[1rem]">
                <Link to="/" className="text-[#ff6b00] font-bold pl-[1rem]">PRINT SHOP</Link>

                <div className="group relative flex h-full">
                    <div className="flex h-full items-center cursor-pointer">
                        <div className="flex items-center gap-[0.2rem] px-[1rem] py-[0.5rem] hover:bg-[#B1B2B5]/25 rounded-[5px] text-[#272727]">
                            <span className="font-bold text-[#272727]">Services</span>
                            <Arrow className="size-5 rotate-270 group-hover:rotate-90 transition-all duration-100"/>
                        </div>
                    </div>

                    <div className="absolute top-[3.5rem] left-1/2 -translate-x-1/2 p-[0.5rem] hidden group-hover:flex flex flex-col items-start shadow-lg bg-[#FFF] rounded-[5px] border border-[#272727]/10">
                        <Link to="/" className="whitespace-nowrap py-[0.5rem] px-[1rem] hover:bg-[#B1B2B5]/25 active:bg-[#B1B2B5]/35 rounded-[5px]">Document Print</Link>
                    </div>
                </div>
            </div>

            <div className="flex items-center h-full gap-[0.2rem]">
                <button className="bg-[#B1B2B5]/25 hover:bg-[#B1B2B5]/50 active:bg-[#B1B2B5]/35 px-[1rem] py-[0.5rem] rounded-[10px] cursor-pointer transition-all duration-100">
                    <span className="px-[1rem] font-bold text-[14px]">Login</span>
                </button>
                <button className="bg-[#ff6b00] hover:bg-[#e76100] active:bg-[#ff6b00] px-[1rem] py-[0.5rem] rounded-[10px] cursor-pointer transition-all duration-100">
                    <span className="text-[#FFF] font-bold text-[14px]">Get Started</span>
                </button>
            </div>
        </section>
    )
}

export default NavBar;