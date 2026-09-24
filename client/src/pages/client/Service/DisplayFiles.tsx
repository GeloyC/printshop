import { useEffect, type SetStateAction } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import DocumentItem from "./DocumentItem";
import NoFilesWrapper from "./NoFilesWrapper";

// icon
import ArrowWithTail from '/src/assets/icon/arrow-with-tail.svg?react'
import Delete from "/src/assets/icon/add.svg?react";
import AddIcon from '/src/assets/icon/add.svg?react'

import { useFileContext } from "../../../context/fileContext";
import type { fileItem } from "../../../types/FileType";

interface DisplayFilesProp {
    setSelectedFile: React.Dispatch<SetStateAction<fileItem|null>>
}

function DisplayFiles ({
    setSelectedFile
}:DisplayFilesProp) {

    const navigate = useNavigate()
    const { files, setFiles, setError } = useFileContext();
    const [dragOver, setDragOver] = useState<boolean>(false);
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragOver(false);

        const droppedFiles = Array.from(e.dataTransfer.files);

        

        droppedFiles.forEach(file => {
            const allowedExtension = ['pdf', 'docx'];
            const fileExtension = file?.name.split('.').pop();

            const newFile: fileItem = {
                id: `${file.name}-${file.name}-${file.lastModified}`,
                file: file,
                quantity: 1
            }

            if(!allowedExtension.includes(String(fileExtension))) {
                console.log(newFile.file.name, ' is not allowed because the extension is ', fileExtension)

                setError('Only file with .pdf, .docx extension allowed');
                setTimeout(()=>setError(''), 3000);
                return;
            }
            
            setFiles(currentFiles => {
                const existing = new Set(
                    currentFiles.map(
                        file => file?.id
                    )
                );


                const key = newFile.id;
                
                if (existing?.has(key)) {

                    setError('Duplicate file')
                    setTimeout(()=>setError(''), 3000)

                    return [...currentFiles];
                }
    
                return [...currentFiles, newFile];
            });
        });
    }

    const handleAddFiles = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();

        const selectedFiles = Array.from(
            e.target.files ?? []
        );


        selectedFiles.forEach(file => {
            const allowedExtension = ['pdf', 'docx'];
            const fileExtension = file?.name.split('.').pop();

            const newFile: fileItem = {
                id: `${file.name}-${file.name}-${file.lastModified}`,
                file: file,
                quantity: 1
            }

            if(!allowedExtension.includes(String(fileExtension))) {
                setError('Only file with .pdf, .docx extension allowed');
                setTimeout(()=>setError(''), 3000);
                return;
            }
            
            setFiles(currentFiles => {
                const existing = new Set(
                    currentFiles.map(
                        file => file.id
                    )
                );

                const id = newFile.id;
                
                if (existing?.has(id)) {
                    console.log(id);

                    setError('Duplicate file')
                    setTimeout(()=>setError(''), 3000)

                    return [...currentFiles];
                }
    
                return [...currentFiles, newFile];
            });
        });
    };

    const handleRemoveFile = (index:number) => {
        setFiles(files => 
            Array.from(files).filter((item, idx) => 
                idx !== index
            )
        )
    }

    const handleRemoveAllFiles = () => setFiles([]) ;

    const handleProceedToCheckout = () => {
        navigate('/cart')
    }


    useEffect(() => {
        console.log('files: ', files)
    }, [files])

    return (
        <div className={`fade-up flex flex-col w-full min-h-[300px] h-fit max-h-[620px] ${dragOver ? 'bg-[#ffdca5]' : 'bg-[#fff8ec]'} border-2 ${files.length <= 0 && 'border-dashed' } border-[#ffc36d] rounded-[10px] overflow-hidden`}>
            {files.length > 0 && (
                <div className="flex items-center justify-between w-full gap-[0.3rem] bg-[#fff0d3] border-b-2 border-dashed border-[#ffc36d] p-[0.5rem]">

                    <span className="text-center text-[14px] text-[#82330c] font-bold w-fit rounded-[5px]">Total file/s: {files.length}</span>

                    <div className="flex items-center gap-[0.5rem]">
                        <div className="flex items-center">
                            <button onClick={handleRemoveAllFiles} className="flex items-center gap-[0.3rem] p-[0.5rem] cursor-pointer hover:bg-[#ff0000]/65 active:bg-transparent rounded-[5px] transition-all duration-100">
                                <Delete className="size-4 rotate-45" />
                                <span className="text-[12px] text-[#292929] font-bold leading-none">Remove all files</span>
                            </button>
                            
                            <input type="file" name="service_addmore" id="service_addmore" accept={'.doc, .docx, .pdf'} multiple hidden onChange={handleAddFiles} />

                            <label htmlFor="service_addmore"
                                className="flex items-center gap-[0.3rem] p-[0.5rem] cursor-pointer hover:bg-[#ffdca5] active:bg-transparent rounded-[5px] transition-all duration-100"
                            >
                                <AddIcon className='size-4' />
                                <span className='text-[12px] text-[#292929] font-bold leading-none'>Add files</span>
                            </label>
                        </div>

                        <button onClick={handleProceedToCheckout} className="group flex items-center gap-[0.3rem] p-[0.5rem] cursor-pointer bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#ffc36d] rounded-[5px] transition-all duration-100">
                            <span className="text-[12px] text-[#fff] group-hover:text-[#fff] font-bold leading-none">Proceed</span>
                            <ArrowWithTail className="size-4" color="#fff" />
                        </button>
                    </div>
                </div>  
            )}
            
            <div onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={()=>setDragOver(false)}
                className={`flex ${files.length > 0 ? 'items-start justify-center' : 'items-center justify-center'} w-full min-h-[300px] h-fit max-h-full p-[1rem]
                overflow-y-auto thin-scrollbar`}
            >
                {files.length <= 0 ? (
                    <NoFilesWrapper />
                ):(
                    <div className="grid grid-cols-2 items-center justify-center gap-[0.5rem] w-full">
                        {files.map((file, index) => (
                            <DocumentItem key={file?.id} 
                                file={file} 
                                onSelectFile={()=>setSelectedFile(file)}
                                handleRemoveFile={()=>handleRemoveFile(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DisplayFiles;