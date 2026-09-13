import { useNavigate } from "react-router-dom";

// icons
import Arrow from '/src/assets/icon/arrow-no-tail.svg?react' 
import ImageIcon from '/src/assets/icon/image.svg?react'

function SelectedService () {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full bg-[#fff]">
            <section className="flex items-center w-full border-b border-[#292929]/10 p-[1rem] gap-[0.5rem]">
                <button onClick={()=>navigate(-1)}
                    className="cursor-pointer hover:bg-[#B1B2B5]/50 active:bg-transparent rounded-full">
                    <Arrow className="size-6" color="#292929" />
                </button>
                <span className="text-[20px] font-bold leading-none text-[#292929]">Service Name</span>
            </section>

            <section className="grid grid-cols-[3fr_8fr] w-full h-full overflow-y-auto thin-scrollbar">
                <div className="flex flex-col w-full p-[1rem] gap-[1rem]">
                    
                    <div className="flex items-center justify-center h-[200px] bg-[#B1B2B5]">
                        Image here
                    </div>

                    <button className="flex items-center justify-center py-[0.5rem] gap-[0.3rem] w-full bg-[#292929] hover:bg-[#292929]/90 active:bg-[#292929] transition-all duration-100 cursor-pointer">
                        <ImageIcon className="size-5" color="#fff"/>
                        <span className="text-[14px] text-[#fff]">Replace image</span>
                    </button>

                </div>

                <div className="flex flex-col w-[700px] p-[1rem] gap-[1rem]">
                    
                    <div className="flex flex-col gap-[0.3rem] w-full">
                        <span className="text-[14px] font-bold leading-none opacity-75">Name</span>

                        <div className="flex items-center justify-between w-full border border-[#292929]/25 focus-within:border-[#ff6b00] p-[0.5rem]">
                            <input type="text" name="service_name" id="service_name" 
                                className="w-full text-[14px] font-bold focus:outline-none"
                            />
                            <button className="cursor-pointer">
                                <span className="text-[14px] text-[#ff6b00] font-bold">Edit</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[0.3rem] w-full">
                        <span className="text-[14px] font-bold leading-none opacity-75">Name</span>

                        <div className="flex items-start justify-between w-full border border-[#292929]/25 focus-within:border-[#ff6b00] p-[0.5rem]">
                            <textarea name="" id="" rows={4} className="w-full text-[14px] font-bold focus:outline-none"></textarea>
                            <button className="cursor-pointer">
                                <span className="text-[14px] text-[#ff6b00] font-bold">Edit</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[0.3rem] w-full">
                        <span className="text-[14px] font-bold leading-none opacity-75">Base price</span>

                        <div className="flex items-center justify-between w-full border border-[#292929]/25 focus-within:border-[#ff6b00] p-[0.5rem]">
                            <input type="text" name="service_name" id="service_name" 
                                className="w-full text-[14px] font-bold focus:outline-none"
                            />
                            <button className="cursor-pointer">
                                <span className="text-[14px] text-[#ff6b00] font-bold">Edit</span>
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default SelectedService;