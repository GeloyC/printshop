import { useState } from 'react';
import type { SetStateAction } from 'react';
import Check from '/src/assets/icon/check.svg?react'

type extensionType = { extension: string }

type FileRequirementProp = {
    acceptedFiles: extensionType[],
    setAcceptedFiles: React.Dispatch<SetStateAction<extensionType[]>>
}

function SSFileRequirement ({ acceptedFiles, setAcceptedFiles }: FileRequirementProp) {

    const fileExtensions = [
        { extension: '.jpeg' },
        { extension: '.jpg' },
        { extension: '.png' },
        { extension: '.pdf' },
        { extension: '.docx' },
    ];

    const [extensions, setExtensions] = useState<extensionType[]>(fileExtensions)

    const handleSelectExtension = (extension: string) => {
        setAcceptedFiles(exts => 
            exts.some(ext => ext.extension === extension)
                ? exts.filter(ext => ext.extension !== extension)
                : [...exts, { extension: extension }]
        )
    }

    
    


    return (
        <div className="flex flex-col w-full gap-[1rem]">
            <div className='flex flex-col gap-[0.5rem] w-full'>
                <span className="text-[16px] text-[#292929] font-bold leading-none">Accepted file/s</span>
                <span className='text-[14px] leading-none opacity-75'>Select the type of file that users are allowed to upload when availing this service. This will prevent user from uploading unnecessary file/s.</span>
            </div>

            <div className="flex flex-wrap items-center justify-start w-full gap-[0.2rem]">
                {extensions.map(ext => {
                    const selected = acceptedFiles.some(
                        file => file.extension === ext.extension
                    );
                    
                    return (
                        <label htmlFor={`file_${ext.extension}`} key={ext.extension}
                        className={`flex items-center px-[1rem] h-[2.5rem] border-2 ${selected ? 'border-[#ff6b00]' : 'border-[#292929]'} rounded-[10px] cursor-pointer`}>
                            <input 
                                type="checkbox" 
                                name={`file_${ext.extension}`} 
                                id={`file_${ext.extension}`} 
                                hidden
                                checked={selected}
                                onChange={()=>handleSelectExtension(ext.extension)}
                            />
                            
                            {selected && <Check className="size-4" color="#ff6b00" /> }
                            <span className={`text-[14px] ${selected ? 'text-[#ff6b00]' : 'text-[#292929]'} font-bold leading-none`}>{ext.extension}</span>
                        </label>
                    )}
                )}
            </div>
        </div>
    )
}

export default SSFileRequirement;