import { type SetStateAction } from "react";
import { useState } from "react";

// components
import DocumentItem from "./DocumentItem";
import NoFilesWrapper from "./NoFilesWrapper";

// icon
import ArrowWithTail from '/src/assets/icon/arrow-with-tail.svg?react'
import Delete from "/src/assets/icon/add.svg?react";
import AddIcon from '/src/assets/icon/add.svg?react'

import type { fileItem } from "../../../types/file.type";
import type { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";

// services

type DisplayFilesProp =  {
    setSelectedFile: React.Dispatch<SetStateAction<fileItem|null>>;
    requiredFiles: string[];
    setFiles: React.Dispatch<SetStateAction<fileItem[]>>;
    files: fileItem[];
    setError: React.Dispatch<SetStateAction<string>>;
    slug: string;
    handleAddToCart: UseMutateFunction<any[], Error, void, unknown>
    AddToCartPending: boolean,
    setFileSetupModalOpen: React.Dispatch<SetStateAction<boolean>>,
    serviceName: string
    serviceDescription: string
    shouldBlock: boolean
}

function DisplayFiles ({
    setSelectedFile,
    requiredFiles,
    setFiles,
    files,
    setError,
    slug,
    handleAddToCart,
    AddToCartPending,
    setFileSetupModalOpen,
    serviceName,
    serviceDescription,
    shouldBlock,
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
        <div className={`flex flex-col flex-1 w-full`}>   
            {files.length > 0 && (
                <div className="flex items-center justify-between w-full gap-[0.3rem] p-[1.5rem] bg-[#ff6b00]">

                    <div className="flex">
                        <span className="text-3xl text-[#fff] font-bold leading-none">{serviceName}</span>
                    </div>


                    <div className="flex items-center gap-[0.5rem]">
                        <div className="flex items-center">
                            <button onClick={handleRemoveAllFiles} className="flex items-center gap-[0.3rem] p-[0.75rem] px-[1rem] cursor-pointer hover:bg-[#ff0000]/65 active:bg-transparent rounded-full transition-all duration-100">
                                <Delete className="size-4 rotate-45" color="#fff"/>
                                <span className="text-[14px] text-[#fff] font-bold leading-none">Remove all files</span>
                            </button>
                            
                            <input type="file" name="service_addmore" id="service_addmore" accept={stringedRequiredFiles} multiple hidden onChange={handleAddFiles} />

                            <label htmlFor="service_addmore"
                                className="group flex items-center gap-[0.3rem] p-[0.75rem] px-[1rem] cursor-pointer hover:bg-[#cc4c02] active:bg-transparent rounded-full transition-all duration-100"
                            >
                                <AddIcon className='size-4' color="#fff"/>
                                <span className='text-[14px] text-[#fff] font-bold leading-none'>Add files</span>
                            </label>
                        </div>

                        <button onClick={()=>handleAddToCart()} disabled={!shouldBlock || AddToCartPending} className={`group flex items-center gap-[0.3rem] p-[0.75rem] px-[1rem] ${!shouldBlock || AddToCartPending ? 'cursor-not-allowed bg-[#9a3902]' : 'bg-[#292929] hover:bg-[#cc4c02] active:bg-[#ffc36d] cursor-pointer'} rounded-full transition-all duration-100`}>
                            <span className="text-[14px] text-[#fff] group-hover:text-[#fff] font-bold leading-none">
                                {AddToCartPending
                                    ? 'Adding to Cart'
                                    : 'Add to Cart'
                                }
                            </span>
                            <ArrowWithTail className={`size-4 ${AddToCartPending && 'group-hover:translate-x-1'} transition-all duration-200`} color="#fff" />
                        </button>
                    </div>
                </div>  
            )}

            
            <div onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={()=>setDragOver(false)}
                className={`flex flex-1 w-full
                    ${ dragOver && files.length > 0 
                        ? 'bg-gradient-to-b from-[#ff6b00] via-[#cc4c02] to-transparent'  // when dragging file
                        : files.length === 0 
                            ? 'bg-transparent'
                            : 'bg-gradient-to-b from-[#ff6b00] to-transparent'  // default
                    } 
                `}
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
                    <div className={`grid grid-cols-2 items-start gap-[0.5rem] w-full h-fit p-[1rem] px-[1.5rem] rounded-t-[15px] transition-all duration-400`}>
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