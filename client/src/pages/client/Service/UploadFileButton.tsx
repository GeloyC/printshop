
import Document from '/src/assets/icon/document.svg?react'

interface Props {
    handleFileChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

function UploadFileButton ({
    handleFileChange
}: Props) {

    return (
        <div>
            
            {/* insert the slug name or service_id on the attr name and id later */}
            <input type="file" onChange={handleFileChange} 
            name={`service_`} id={`service_`} multiple hidden />

            {/* insert the slug name or service_id on the attr htmlFor later */}
            <label htmlFor={`service_`}
            className="flex items-center gap-[0.5rem] bg-[#ff6b00] hover:bg-[#cc4c02]/90 active:bg-[#ff6b00] cursor-pointer px-[1rem] py-[0.75rem] rounded-[5px]">
                <Document className="size-5" color="#fff" />
                <span className="text-[#fff] text-[18px] leading-none">Choose file</span>
            </label>

        </div>
    )
}

export default UploadFileButton