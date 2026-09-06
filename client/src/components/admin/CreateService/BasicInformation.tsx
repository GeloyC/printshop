



function BasicInformation () {

    return (
        <div className="flex flex-col w-full gap-[1.5rem]">
            <span className="text-[16px] text-[#292929] font-bold">Basic Information</span>

            <div className="flex flex-col gap-[0.5rem] w-full">
                <div className="flex flex-col items-start w-full">
                    <span className="text-[14px] text-[#292929]/75 font-bold">Name of service</span>
                    <input type="text" name="service_name" id="service_name" 
                    className="w-full p-[0.5rem] text-[14px] font-bold border border-[#292929]/25 bg-[#f2f2f2] focus:outline-[#ff6b00]" />
                </div>

                <div className="flex flex-col items-start w-full">
                    <span className="text-[14px] text-[#292929]/75 font-bold">Description</span>
                    <textarea name="service_description" id="service_description" rows={4}
                    className="w-full p-[0.5rem] text-[14px] font-bold border border-[#292929]/25 bg-[#f2f2f2] focus:outline-[#ff6b00]" />
                </div>

                <div className="flex flex-col items-start w-full">
                    <span className="text-[14px] text-[#292929]/75 font-bold">Base Price (Php)</span>
                    <input type="text" name="service_base_price" id="service_base_price" 
                    className="w-full p-[0.5rem] text-[14px] font-bold border border-[#292929]/25 bg-[#f2f2f2] focus:outline-[#ff6b00]" />
                </div>
            </div>
        </div>
    )

}

export default BasicInformation