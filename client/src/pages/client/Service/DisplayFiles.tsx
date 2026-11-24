import { type SetStateAction } from "react";
import { useState } from "react";

// components
import DocumentItem from "./DocumentItem";
import NoFilesWrapper from "./NoFilesWrapper";

// icon
import ArrowWithTail from '/src/assets/icon/arrow-with-tail.svg?react'
import Delete from "/src/assets/icon/delete_v2.svg?react";
import AddIcon from '/src/assets/icon/add.svg?react'
import CartIcon from '/src/assets/icon/cart.svg?react'

import type { fileItem } from "../../../types/file.type";
import type { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
import { getDocxPageCount } from "../../../utils/getDocxPageCount";
import { getPdfPageCount } from "../../../utils/getPdfPageCount";

// services

type DisplayFilesProp =  {
    setSelectedFile: React.Dispatch<SetStateAction<fileItem|null>>;
    selectedFile: fileItem|null,
    requiredFiles: string[];
    setFiles: React.Dispatch<SetStateAction<fileItem[]>>;
    files: fileItem[];
    setError: React.Dispatch<SetStateAction<string>>;
    slug: string;
    handleAddToCart: UseMutateFunction<any[], Error, void, unknown>
    AddToCartPending: boolean,
    setFileSetupModalOpen: React.Dispatch<SetStateAction<boolean>>,
}

function DisplayFiles ({
    setSelectedFile,
    selectedFile,
    requiredFiles,
    setFiles,
    files,
    setError,
    slug,
    handleAddToCart,
    AddToCartPending,
    setFileSetupModalOpen,
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

        droppedFiles.forEach(async file => {
            const allowedExtension = requiredFiles;
            const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

            let count: number | null = null;
            if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                count = await getDocxPageCount(file);
            } else if (file.type === 'application/pdf') {
                count = await getPdfPageCount(file);
            }

            const newFile: fileItem = {
                id:  crypto.randomUUID(),
                file: file,
                quantity: 1,
                slug: String(slug),
                pageCount: Number(count)
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


        selectedFiles.forEach(async file => {
            const allowedExtension = requiredFiles;
            const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

            let count: number | null = null;
            if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                count = await getDocxPageCount(file);
            } else if (file.type === 'application/pdf') {
                count = count = await getPdfPageCount(file);
            }

            const newFile: fileItem = {
                id:  crypto.randomUUID(),
                file: file,
                quantity: 1,
                slug: String(slug),
                pageCount: Number(count)
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

    const allFilesConfigured = files.every(file => !!file.configuration?.length);
    const isAddToCartDisabled = files.length === 0 || !allFilesConfigured || AddToCartPending;
    const totalConfiguredFiles = files.map(file => !!file.configuration?.length).filter(item => item === true).length;

    console.log(files);

    return (
        <div className={`relative flex flex-1 items-start w-full gap-[1rem]`}>   
            <div className="sticky top-[5rem] z-10 flex w-fit  min-w-[3rem]">

                <div className="absolute top-0 flex flex-col items-start gap-[0.5rem]">
                    <div className="flex items-center">
                        <input type="file" name="service_addmore" id="service_addmore" accept={stringedRequiredFiles} multiple hidden onChange={handleAddFiles} />

                        <label 
                            htmlFor="service_addmore"
                            title="Upload file/s"
                            className="relative group flex items-center p-[0.75rem] cursor-pointer bg-[#292929] hover:bg-[#292929] active:bg-[#141414] rounded-full transition-all duration-200"
                        >
                            <AddIcon className='size-6' color="#fafafa"/>

                            <div className="opacity-0 group-hover:opacity-100 flex items-center transition-all duration-200">
                                <span className="hidden  group-hover:flex group-hover:px-[0.5rem] text-md text-[#fafafa] text-nowrap font-bold">Upload file</span>
                            </div>

                        </label>
                    </div>

                    <button 
                        onClick={handleRemoveAllFiles} 
                        title="Remove all file/s"
                        className="relative group flex items-center p-[0.75rem] cursor-pointer bg-[#292929] hover:bg-[#b90000] active:bg-transparent rounded-full transition-all duration-100"
                    >
                        <Delete className="size-6" color="#fafafa"/>
                        <div className="opacity-0 group-hover:opacity-100 flex items-center transition-all duration-200">
                            <span className="hidden  group-hover:flex group-hover:px-[0.5rem] text-md text-[#fafafa] text-nowrap font-bold">Remove all files</span>
                        </div>
                    </button>

                    <button onClick={()=>handleAddToCart()} disabled={isAddToCartDisabled} className={`relative group flex items-center p-[0.75rem] ${isAddToCartDisabled ? 'cursor-not-allowed bg-[#B1B2B5]' : 'bg-[#498d49] hover:bg-[#325e32] active:bg-[#498d49] cursor-pointer'} rounded-full transition-all duration-100`}>
                        <CartIcon className={`size-6 ${isAddToCartDisabled && ''} transition-all duration-200`} color="#fff" />

                        <div className="opacity-0 group-hover:opacity-100 flex items-center ">
                            <span className="hidden  group-hover:flex group-hover:px-[0.5rem] text-md text-[#fafafa] text-nowrap font-bold">Add to cart</span>
                        </div>
                    </button>
                </div>

            </div>  

            
            <div onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={()=>setDragOver(false)}
                className={`sticky top-[5rem] flex flex-col w-full h-[calc(100vh-6rem)] overflow-y-auto thin-scrollbar rounded-[15px] mb-[1rem]
                    ${ dragOver && files.length > 0 
                        ? 'bg-[#ffdca3] blur-[5px]'  // when dragging file
                        : files.length === 0 
                            ? 'bg-transparent'
                            : 'bg-[#ffdca3]'  // default
                    } 
                `}
            >   
                
                

                {files.length > 0 
                    ? <div className={`grid grid-cols-1 w-full min-h-0 h-fit`}>
                        <div className="flex w-full px-[1rem] py-[0.75rem]">
                            <span className="text-sm font-bold text-[#404040]">Total files: {files.length}</span>
                        </div>

                        {files.map((file, index) => {
                            if (file.slug === slug) {
                                return (
                                    <DocumentItem key={file?.id} 
                                        file={file} 
                                        onSelectFile={()=>handleOpenFileConfigurationSetupModal(file)}
                                        onCancel={()=>setFileSetupModalOpen(false)}
                                        handleRemoveFile={()=>handleRemoveFile(index)}
                                        selectedFile={selectedFile}
                                    />
                                )}
                            }
                        )}
                    </div>
                    : <div className="flex flex-1 justify-center items-center bg-[#ffdca3]">
                        <span className="text-md text-[#404040] font-bold">No files uploaded yet</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default DisplayFiles;