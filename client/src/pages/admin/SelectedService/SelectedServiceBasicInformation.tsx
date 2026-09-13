import type { SetStateAction } from "react";
import type { BasicInformationType } from "../../../types/admin/service";

interface SelectedServiceBasicInformationProp {
    basicInformation: BasicInformationType;
    setBasicInformation: React.Dispatch<SetStateAction<BasicInformationType>>
}

function SelectedServiceBasicInformation ({
    basicInformation,
    setBasicInformation
}: SelectedServiceBasicInformationProp) {

    return (
        <div className="flex flex-col gap-[1rem]">
            <span className="text-[16px] font-bold">Basic Information</span>

            <div className="flex flex-col gap-[0.3rem] w-full">
                <span className="text-[14px] font-bold leading-none opacity-75">Name</span>

                <div className="flex items-center justify-between w-full border border-[#292929]/25 focus-within:border-[#ff6b00] p-[0.5rem]">
                    <input type="text" name="service_name" id="service_name" 
                        value={basicInformation.name} onChange={(e)=>setBasicInformation(prev=>({
                            ...prev,
                            name: e.target.value
                        }))}
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
                    <textarea name="" id="" rows={4} 
                    value={basicInformation.description} onChange={(e)=>setBasicInformation(prev=>({
                            ...prev,
                            description: e.target.value
                        }))}
                    className="w-full text-[14px] font-bold focus:outline-none"></textarea>
                    <button className="cursor-pointer">
                        <span className="text-[14px] text-[#ff6b00] font-bold">Edit</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-[0.3rem] w-full">
                <span className="text-[14px] font-bold leading-none opacity-75">Base price</span>

                <div className="flex items-center justify-between w-full border border-[#292929]/25 focus-within:border-[#ff6b00] p-[0.5rem]">
                    <input type="text" name="service_name" id="service_name" 
                        value={basicInformation.base_price} onChange={(e)=>setBasicInformation(prev=>({
                            ...prev,
                            base_price: Number(e.target.value)
                        }))}
                        className="w-full text-[14px] font-bold focus:outline-none"
                    />
                    <button className="cursor-pointer">
                        <span className="text-[14px] text-[#ff6b00] font-bold">Edit</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SelectedServiceBasicInformation;