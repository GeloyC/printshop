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
}:DisplayFilesProp) {

    // ----------------------------------  ---------------------------------- //

    const stringedRequiredFiles = requiredFiles.join(', ');
    const MAX_FILE_SIZE = 20 * 1024 * 1024;

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

            // allow files less than or equal to 20 mb
            
            if (file.size > MAX_FILE_SIZE) {
                setError('File size too big. File must be less than 20 mb');
                setTimeout(() => setError(''), 3000);

                return;
            } 


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

            // allow only file size less than or equal to 20 mb
            if (file.size > MAX_FILE_SIZE) {
                setError('File size too big. File must be less than 20 mb');
                setTimeout(() => setError(''), 3000);

                return;
            } 


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
    }

    const allFilesConfigured = files.every(file => !!file.configuration?.length);
    const isAddToCartDisabled = files.length === 0 || !allFilesConfigured || AddToCartPending;
    const totalConfiguredFiles = files.map(file => !!file.configuration?.length).filter(item => item === true).length;


    return (
        <div className={`relative flex flex-col flex-1 items-start w-full sticky top-[5rem] flex flex-col w-full h-[calc(100vh-6rem)]`}>   
            <div className="flex items-start justify-between w-full">
                <div className="flex items-center bg-[#ffdca3] rounded-t-[15px]">
                    <div className="flex items-center">
                        <input 
                            type="file" 
                            name="service_addmore" 
                            id="service_addmore" 
                            accept={stringedRequiredFiles} 
                            multiple hidden 
                            onChange={handleAddFiles} 
                            disabled={AddToCartPending}
                        />

                        <label 
                            htmlFor="service_addmore"
                            title="Upload file/s"
                            className="group flex items-center p-[0.75rem] gap-[0.5rem] hover:gap-[1rem] active:opacity-75 cursor-pointer transition-all duration-200"
                        >
                            <AddIcon className='size-4 opacity-25 group-hover:opacity-100 transition-all duration-100' color="#292929"/>

                            <div className={`flex items-center transition-all duration-200 ${AddToCartPending && 'opacity-50'}`}>
                                <span className="flex text-sm text-[#292929] text-nowrap font-bold leading-none">Upload file</span>
                            </div>

                        </label>
                    </div>

                    <button 
                        onClick={handleRemoveAllFiles} 
                        disabled={AddToCartPending}
                        title="Remove all file/s"
                        className="group flex items-center p-[0.75rem] gap-[0.5rem] hover:gap-[1rem] active:opacity-75 cursor-pointer transition-all duration-100"
                    >
                        <Delete className="size-4 opacity-25 group-hover:opacity-100 transition-all duration-100" color="#292929"/>
                        <span className={`flex text-sm text-[#292929] text-nowrap font-bold leading-none ${AddToCartPending && 'opacity-50'}`}>Remove all files</span>
                    </button>
                </div>

                <div className="flex flex-1 h-full bg-[#ffdca3]">
                    <div className="flex items-center px-[1rem] w-full h-full rounded-b-[15px] bg-[#fff8ec]">
                        <span className="text-sm font-bold text-[#404040]">Total files: {files.length}</span>
                    </div>
                </div>

                
                <button onClick={()=>handleAddToCart()} disabled={isAddToCartDisabled} className={`group flex items-center gap-[0.5rem]  p-[0.75rem] px-[1rem] ${isAddToCartDisabled ? 'cursor-not-allowed' : 'hover:gap-[1rem] active:opacity-75 cursor-pointer'} transition-all duration-100 bg-[#ffdca3] rounded-t-[15px]`}>
                    <CartIcon className={`size-4 ${isAddToCartDisabled ? 'opacity-25' : 'opacity-25 group-hover:opacity-100'} transition-all duration-200`} color="#292929" />

                    <div className="flex items-center ">
                        <span className={`text-sm text-[#292929] text-nowrap font-bold leading-none ${isAddToCartDisabled && 'opacity-25'}`}>Add to cart</span>
                    </div>

                    <span className="text-[12px] text-[#fafafa] p-[0.1rem] px-[0.3rem] bg-[#ff6b00] leading-none rounded-full">{totalConfiguredFiles}</span>
                </button>
            </div>


            
            <div onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={()=>setDragOver(false)}
                className={`flex flex-1 w-full h-full overflow-y-auto thin-scrollbar rounded-b-[15px]
                    ${ dragOver && files.length > 0 
                        ? 'bg-[#ffdca3] blur-[5px]'  // when dragging file
                        : files.length === 0 
                            ? 'bg-transparent'
                            : 'bg-[#ffdca3]'  // default
                    } 
                `}
            >   

                {files.length > 0 
                    ? <div className={`grid grid-cols-1 w-full min-h-0 h-fit py-[1rem]`}>
                        {files.map((file, index) => {
                            if (file.slug === slug) {
                                return (
                                    <DocumentItem key={file?.id} 
                                        file={file} 
                                        onSelectFile={()=>handleOpenFileConfigurationSetupModal(file)}
                                        handleRemoveFile={()=>handleRemoveFile(index)}
                                        selectedFile={selectedFile}
                                    />
                                )}
                            }
                        )}
                    </div>
                    : <div className={`flex flex-1 justify-center items-center bg-[#ffdca3] ${dragOver && 'blur-[5px]'}`}>
                        <span className="text-md text-[#404040] font-bold">No files uploaded yet</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default DisplayFiles;