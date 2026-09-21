
function Checkout () {

    return (
        <div className="flex flex-col items-center w-full h-full py-[1rem] gap-[1rem]">
            <span className="text-[24px] text-[#292929] font-bold leading-none">Checkout</span>

            <section className="flex flex-col items-center w-[700px] gap-[0.5rem]">
                
                {/* Item block */}
                <div className="flex flex-col w-full p-[0.75rem] bg-[#fff0d3] border border-[#ffdca5]/50 rounded-[5px] shadow-lg">

                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-[0.5rem]">
                            {/* conditionally display icon for pdf or docx file based on file extension later */}
                            <span className="text-[14px] text-[#292929] font-bold leading-none">Filename.pdf</span>
                        </div>

                        <span className="text-[16px] font-bold text-[#ff6b00] leading-none">Php 10.00</span>
                    </div>

                    <div className="flex items-end justify-between w-full">
                        <div className="flex flex-col w-full">
                            <span className="text-[14px] opacity-50 leading-tight">Service: Document Print</span>
                            <span className="text-[14px] opacity-50 leading-tight">Configuration: Long, Black & White</span>
                        </div>

                        {/* add quantity and delete button */}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Checkout