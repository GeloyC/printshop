import type { SetStateAction } from "react";
// import type { BasicInformationType } from "./CreateService"
import type { BasicInformationType } from "../../../types/service/service";

interface BasicInformationProp {
    basicInfo: BasicInformationType;
    setBasicInfo: React.Dispatch<SetStateAction<BasicInformationType>>
}


function CreateServiceBasicInformation ({
    basicInfo,
    setBasicInfo
}:BasicInformationProp) {

    return (
        <div className="flex flex-col w-full gap-[1.5rem]">
            <span className="text-[16px] text-[#292929] font-bold">Basic Information</span>

            <div className="flex flex-col gap-[0.5rem] w-full">
                <div className="flex flex-col items-start w-full">
                    <span className="text-[14px] text-[#292929]/75 font-bold">Name of service</span>
                    <input type="text" name="service_name" id="service_name" 
                    value={basicInfo.name} onChange={(e) => setBasicInfo(prev => ({
                        ...prev,
                        name: e.target.value
                    }))}
                    className="w-full p-[0.5rem] text-[14px] font-bold border border-[#292929]/25 bg-[#f2f2f2] focus:outline-[#ff6b00]" />
                </div>

                <div className="flex flex-col items-start w-full">
                    <span className="text-[14px] text-[#292929]/75 font-bold">Description</span>
                    <textarea name="service_description" id="service_description" rows={4}
                    value={basicInfo.description} onChange={(e) => setBasicInfo(prev => ({
                        ...prev,
                        description: e.target.value
                    }))} 
                    className="w-full p-[0.5rem] text-[14px] font-bold border border-[#292929]/25 bg-[#f2f2f2] focus:outline-[#ff6b00]" />
                </div>

                <div className="flex flex-col items-start w-full">
                    <span className="text-[14px] text-[#292929]/75 font-bold">Base Price (Php)</span>
                    <input type="text" name="service_base_price" id="service_base_price" 
                    value={Number(basicInfo.base_price)} onChange={(e) => setBasicInfo(prev => ({
                        ...prev,
                        base_price: Number(e.target.value)
                    }))}
                    className="w-full p-[0.5rem] text-[14px] font-bold border border-[#292929]/25 bg-[#f2f2f2] focus:outline-[#ff6b00]" />
                </div>
            </div>
        </div>
    )

}

export default CreateServiceBasicInformation