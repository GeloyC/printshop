

// icon 
import UploadBig from '/src/assets/icon/upload_big.svg?react'
import Document from '/src/assets/icon/document.svg?react'
import type { fileItem } from "../../../types/FileType";
import type { SetStateAction } from "react";

type NoFilesWrapperProp = {
    serviceName: string,
    serviceDescription: string,
    requiredFiles: string[],
    setFiles: React.Dispatch<SetStateAction<fileItem[]>>,
    setError: React.Dispatch<SetStateAction<string>>,
    slug: string
    dragOver: boolean;
}

function NoFilesWrapper ({ 
    serviceName, 
    serviceDescription, 
    requiredFiles, 
    setFiles, 
    setError, 
    slug, 
    dragOver 
}: NoFilesWrapperProp) {

    const stringedRequiredFiles = requiredFiles.join(', ');
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = Array.from(e.target.files ?? []);
        
        files.forEach(file => {

            const allowedExtension = requiredFiles;
            const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

            const newFile: fileItem = {
                id: crypto.randomUUID(),
                file: file,
                quantity: 1,
                slug: String(slug)
            }

            if(!allowedExtension.includes(String(fileExtension))) {
                setError(`'Only file with ${stringedRequiredFiles} extension allowed'`);
                setTimeout(()=>setError(''), 3000);
                return;
            }

            setFiles(currentFiles =>  [...currentFiles, newFile]);
        })
    }

    console.log('asdasd: ', requiredFiles);

    return (
        <div className={`flex flex-col items-center justify-center gap-[4rem] w-full h-full rounded-[15px] transition-all duration-400`}>

            <div className='flex flex-col items-center gap-[0.75rem]'>
                <span className='text-5xl text-[#292929] font-bold'>{serviceName}</span>
                <span className='text-lg text-[#292929]'>{serviceDescription}</span>
            </div>
            
            <div className={`flex flex-col items-center gap-[1rem] ${dragOver ? 'bg-[#ffc36d] p-[4rem]' : 'p-[2rem]'} bg-[#ffdca5] rounded-[15px] transition-all duration-200`}>
                <UploadBig className="w-[100px] h-auto opacity-75"/>

                <div className="flex flex-col items-center gap-[0.5rem]">

                    <div className='w-fit'>
                        {/* insert the slug name or service_id on the attr name and id later */}
                        <input type="file" onChange={handleFileChange} accept={stringedRequiredFiles}
                                name={`service_`} id={`service_`} multiple hidden />

                        {/* insert the slug name or service_id on the attr htmlFor later */}
                        <label htmlFor={'service_'}
                        className="flex items-center gap-[0.5rem] bg-[#ff6b00] hover:bg-[#cc4c02]/90 active:bg-[#ff6b00] cursor-pointer p-[1rem] px-[1.5rem] rounded-[10px] transition-all duration-200">
                            <Document className="size-5" color="#fff" />
                            <span className="text-[#fff] text-[14px] font-bold leading-none">SELECT YOUR FILE/S</span>
                        </label>
                    </div>


                    <span className="text-[14px] text-[#292929] font-[600] opacity-75">or drop your files here</span>
                    <span className="text-[14px] text-[#292929] font-[600] opacity-50">(Only{requiredFiles.join(', ')} allowed)</span>
                </div>
            </div>
        </div>
    )
}

export default NoFilesWrapper;