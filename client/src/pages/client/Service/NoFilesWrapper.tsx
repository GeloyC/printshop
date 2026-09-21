import { useFileContext } from "../../../context/fileContext";

// icon 
import UploadBig from '/src/assets/icon/upload_big.svg?react'
import Document from '/src/assets/icon/document.svg?react'


function NoFilesWrapper () {

    const { setFiles } = useFileContext()
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = Array.from(e.target.files ?? []);
        setFiles(files);
    }

    return (
        <div className="flex flex-col items-center gap-[1rem]">
            <UploadBig className="w-[100px] h-auto opacity-75"/>

            <div className="flex flex-col items-center gap-[0.5rem]">

                <div className='w-fit'>
                    {/* insert the slug name or service_id on the attr name and id later */}
                    <input type="file" onChange={handleFileChange} accept={'.doc, .docx, .pdf'}
                            name={`service_`} id={`service_`} multiple hidden />

                    {/* insert the slug name or service_id on the attr htmlFor later */}
                    <label htmlFor={'service_'}
                    className="flex items-center gap-[0.5rem] bg-[#ff6b00] hover:bg-[#cc4c02]/90 active:bg-[#ff6b00] cursor-pointer p-[0.5rem] rounded-[5px]">
                        <Document className="size-5" color="#fff" />
                        <span className="text-[#fff] text-[14px] font-bold leading-none">Choose file</span>
                    </label>
                </div>


                <span className="text-[14px] text-[#292929] font-[600] opacity-75">or drop your files here</span>
            </div>
        </div>
    )
}

export default NoFilesWrapper;