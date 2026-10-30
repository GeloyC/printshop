import { useEffect, type SetStateAction } from "react";
import { useState } from "react";

// components
import DocumentItem from "./DocumentItem";
import NoFilesWrapper from "./NoFilesWrapper";

// icon
import ArrowWithTail from '/src/assets/icon/arrow-with-tail.svg?react'
import Delete from "/src/assets/icon/add.svg?react";
import AddIcon from '/src/assets/icon/add.svg?react'

import { useCartContext } from "../../../context/cartContext";
import type { fileItem } from "../../../types/FileType";

// services

type DisplayFilesProp =  {
    setSelectedFile: React.Dispatch<SetStateAction<fileItem|null>>;
    requiredFiles: string[];
    setFiles: React.Dispatch<SetStateAction<fileItem[]>>;
    files: fileItem[];
    setError: React.Dispatch<SetStateAction<string>>;
    slug: string;
    handleCheckoutAttemp: () => void;
    setFileSetupModalOpen: React.Dispatch<SetStateAction<boolean>>,
    serviceName: string
    serviceDescription: string
}

function DisplayFiles ({
    setSelectedFile,
    requiredFiles,
    setFiles,
    files,
    setError,
    slug,
    handleCheckoutAttemp,
    setFileSetupModalOpen,
    serviceName,
    serviceDescription
}:DisplayFilesProp) {

    // ----------------------------------  ---------------------------------- //

    const stringedRequiredFiles = requiredFiles.join(', ');

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
            
            setFiles(currentFiles => {
                const existing = new Set(
                    currentFiles.map(
                        file => file.file?.name
                    )
                );


                const filename = newFile.file.name;
                
                if (existing?.has(filename)) {
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
            const allowedExtension = requiredFiles;
            const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

            const newFile: fileItem = {
                id:  crypto.randomUUID(),
                file: file,
                quantity: 1,
                slug: String(slug)
            }

            if(!allowedExtension.includes(String(fileExtension))) {
                setError(`'Only file with ${stringedRequiredFiles} extension allowed'`);
                setTimeout(()=>setError(''), 3000);
                return;
            }
            
            setFiles(currentFiles => {
                const existing = new Set(
                    currentFiles.map(
                        file => file.file.name
                    )
                );

                const filename = newFile.file.name;
                
                if (existing?.has(filename)) {
                    console.log(filename);

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
            Array.from(files).filter((_, idx) => 
                idx !== index
            )
        )
    }

    const handleRemoveAllFiles = () => setFiles([]) ;


    const handleOpenFileConfigurationSetupModal = (file: fileItem) => {
        setSelectedFile(file);
        setFileSetupModalOpen(true);
    }


    return (
        <div className={`flex flex-col w-full h-full
            ${files.length !== 0 
                ? 'items-start justify-start'
                : 'items-center justify-center'
            }
        `}>   

            {files.length > 0 && (
                <div className="flex items-center justify-between w-full gap-[0.3rem] p-[1rem] rounded-t-[15px] bg-[#fff8ec] border-b border-[#ffc36d]">

                    {/* <span className="text-center text-[14px] text-[#82330c] font-bold w-fit">Total file/s: {files.length}</span> */}

                    <div className="flex">
                        <span className="text-3xl text-[#292929] font-bold leading-none">{serviceName}</span>
                    </div>


                    <div className="flex items-center gap-[0.5rem]">
                        <div className="flex items-center">
                            <button onClick={handleRemoveAllFiles} className="flex items-center gap-[0.3rem] p-[0.5rem] cursor-pointer hover:bg-[#ff0000]/65 active:bg-transparent rounded-[5px] transition-all duration-100">
                                <Delete className="size-4 rotate-45" />
                                <span className="text-[12px] text-[#292929] font-bold leading-none">Remove all files</span>
                            </button>
                            
                            <input type="file" name="service_addmore" id="service_addmore" accept={stringedRequiredFiles} multiple hidden onChange={handleAddFiles} />

                            <label htmlFor="service_addmore"
                                className="flex items-center gap-[0.3rem] p-[0.5rem] cursor-pointer hover:bg-[#ffdca5] active:bg-transparent rounded-[5px] transition-all duration-100"
                            >
                                <AddIcon className='size-4' />
                                <span className='text-[12px] text-[#292929] font-bold leading-none'>Add files</span>
                            </label>
                        </div>

                        <button onClick={handleCheckoutAttemp} className="group flex items-center gap-[0.3rem] p-[0.75rem] px-[1rem] cursor-pointer bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#ffc36d] rounded-[10px] transition-all duration-100">
                            <span className="text-[12px] text-[#fff] group-hover:text-[#fff] font-bold leading-none">Proceed</span>
                            <ArrowWithTail className="size-4" color="#fff" />
                        </button>
                    </div>
                </div>  
            )}

            
            <div onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={()=>setDragOver(false)}
                className={
                    `flex w-full h-full thin-scrollbar transition-all duration-400 p-[1rem]
                    ${ files.length > 0 
                        ? 'items-start justify-center' 
                        : 'items-center justify-center'
                    } 
                    ${ dragOver && files.length > 0
                        ? 'bg-[#fff0d3]' 
                        : files.length == 0 
                            ? 'bg-transparent' : 
                            'bg-[#fff8ec]'
                    }  
                    ${ files.length <= 0 && 'border-dashed' }`
                }
            >
                {files.length == 0 ? (
                    <NoFilesWrapper 
                        serviceName={serviceName}
                        serviceDescription={serviceDescription}
                        requiredFiles={requiredFiles}
                        dragOver={dragOver}
                        setFiles={setFiles}
                        setError={setError}
                        slug={slug}
                    />
                ):(
                    <div className="grid grid-cols-2 items-start justify-center gap-[1rem] w-full">
                        {files.map((file, index) => {
                            if (file.slug === slug) {
                                return (
                                    <DocumentItem key={file?.id} 
                                        file={file} 
                                        onSelectFile={()=>handleOpenFileConfigurationSetupModal(file)}
                                        onCancel={()=>setFileSetupModalOpen(false)}
                                        handleRemoveFile={()=>handleRemoveFile(index)}
                                    />
                                )}
                            }
                        )}
                    </div>
                )}
            </div>


            
        </div>
    )
}

export default DisplayFiles;