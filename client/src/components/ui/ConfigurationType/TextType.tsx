import type { SetStateAction } from "react";
import type { fileItem } from "../../../types/file.type";

type TextTypeProps = { 
    selectedFileId: string
    additionalInstruction: string,
    setAdditionalInstruction: React.Dispatch<SetStateAction<string>>
}
function TextType ({ 
    selectedFileId,
    additionalInstruction,
    setAdditionalInstruction
}:TextTypeProps) { 

    return (
        <div className={`group flex flex-col w-full gap-[0.5rem]`}>
            <span className="text-[14px] text-[#292929] leading-none"><strong>Addition instruction</strong> (Not required)</span>

            <textarea name="config_text" id="config_text" rows={3}
            disabled={!selectedFileId}
            value={additionalInstruction} onChange={(e) => setAdditionalInstruction(e.target.value)}
            className={`bg-[#fafafa] rounded-[5px] z-10 w-full p-[0.5rem] text-[14px] ${!selectedFileId ? 'border border-[#fafafa]' : 'border border-[#fafafa]'} font-bold focus:outline-none`}
            ></textarea>
        </div>
    )
}

export default TextType;