import type { SetStateAction } from "react";
import type { BasicInformationType } from "../../../types/service/service";

interface SelectedServiceBasicInformationProp {
    basicInformation: BasicInformationType;
    setBasicInformation: React.Dispatch<SetStateAction<BasicInformationType>>
    isEditing: boolean
}

function SelectedServiceBasicInformation ({
    basicInformation,
    setBasicInformation,
    isEditing
}: SelectedServiceBasicInformationProp) {


    return (
        <div className="flex flex-col gap-[1rem]">
            <span className="text-[16px] font-bold">Basic Information</span>

            <div className="flex flex-col gap-[0.3rem] w-full">
                <span className="text-[14px] font-bold leading-none opacity-75">Name</span>

                <div className={`flex items-center justify-between w-full border border-[#292929]/25 ${isEditing && 'border-dashed border-[#ff6b00] bg-[#fff8ec]'} bg-[#f2f2f2] p-[0.5rem] rounded-[5px]`}>
                    <input type="text" name="service_name" id="service_name" 
                        value={basicInformation.name} onChange={(e)=>setBasicInformation(prev=>({
                            ...prev,
                            name: e.target.value
                        }))}
                        disabled={!isEditing}
                        className="w-full text-[14px] font-bold focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-[0.3rem] w-full">
                <span className="text-[14px] font-bold leading-none opacity-75">Description</span>

                <div className={`flex items-start justify-between w-full border border-[#292929]/25 ${isEditing && 'border-dashed border-[#ff6b00] bg-[#fff8ec]'} bg-[#f2f2f2] p-[0.5rem] rounded-[5px]`}>
                    <textarea name="" id="" rows={4} 
                    value={basicInformation.description} onChange={(e)=>setBasicInformation(prev=>({
                            ...prev,
                            description: e.target.value
                        }))}
                    disabled={!isEditing}
                    className="w-full text-[14px] font-bold focus:outline-none"></textarea>
                </div>
            </div>

            <div className="flex flex-col gap-[0.3rem] w-full">
                <span className="text-[14px] font-bold leading-none opacity-75">Base price</span>

                <div className={`flex items-center justify-between w-full border border-[#292929]/25 ${isEditing && 'border-dashed border-[#ff6b00] bg-[#fff8ec]'} bg-[#f2f2f2] p-[0.5rem] rounded-[5px]`}>
                    <input type="text" name="service_name" id="service_name" 
                        value={basicInformation.base_price} 
                        onChange={(e) => {
                            const value = e.target.value;
                            const checkValue = /^\d*\.?\d*$/;

                            if (checkValue.test(value)) {
                                setBasicInformation(prev => ({
                                    ...prev,
                                    base_price: value
                                })
                            )}}
                        }
                        disabled={!isEditing}
                        className="w-full text-[14px] font-bold focus:outline-none"
                    />
                </div>
            </div>
        </div>
    )
}

export default SelectedServiceBasicInformation;