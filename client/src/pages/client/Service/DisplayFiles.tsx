import { type SetStateAction } from "react";
import { useState } from "react";

// components
import UploadFileButton from "./UploadFileButton";

// icon
import DocumentItem from "./DocumentItem";
import AddFileButton from "./AddFileButton";

interface DisplayFilesProp {
    files: File[]
    setFiles: React.Dispatch<SetStateAction<File[]>>
    setSelectedFile: React.Dispatch<SetStateAction<File|null>>
}

function DisplayFiles ({
    files,
    setFiles,
    setSelectedFile
}:DisplayFilesProp) {

    const [dragOver, setDragOver] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = Array.from(e.target.files ?? []);
        setFiles(files);
    }
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragOver(false);

        const droppedFiles = Array.from(e.dataTransfer.files);

        setFiles(currentFiles => {
            const existing = new Set(
                currentFiles.map(
                    file => `${file.name}-${file.size}-${file.lastModified}`
                )
            );

            const newFiles = droppedFiles.filter(file => {
                const key = `${file.name}-${file.size}-${file.lastModified}`;
                return !existing.has(key);
            });

            return [...currentFiles, ...newFiles];
        });
    }

    const handleAddFiles = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();

        const selectedFiles = Array.from(
            e.target.files ?? []
        );

        setFiles(currentFiles => {
            const existing = new Set(
                currentFiles.map(
                    file => `${file.name}-${file.size}-${file.lastModified}`
                )
            );

            const newFiles = selectedFiles.filter(file => {
                const key = `${file.name}-${file.size}-${file.lastModified}`;
                return !existing.has(key);
            });

            return [...currentFiles, ...newFiles];
        });
    };

    const handleRemoveFile = (index:number) => {
        setFiles(files => 
            Array.from(files).filter((item, idx) => 
                idx !== index
            )
        )
    }


    return (
        <div className={`fade-up flex flex-col w-full min-h-[300px] h-fit max-h-[620px] ${dragOver ? 'bg-[#ffdca5]' : 'bg-[#fff8ec]'}   border-2 ${files.length <= 0 && 'border-dashed' } border-[#ffc36d] rounded-[10px] overflow-hidden`}>
            {files.length > 0 && (
                <div className="flex items-center justify-between w-full gap-[0.3rem] bg-[#fff0d3] border-b-2 border-dashed border-[#ffc36d] p-[0.5rem]">
                    <span className="text-center text-[14px] text-[#82330c] font-bold w-fit rounded-[5px]">Total files: {files.length}</span>

                    <div className="flex items-center gap-[0.2rem]">
                        <AddFileButton handleAddFiles={handleAddFiles} />

                        <button className="py-[0.3rem] px-[0.5rem] cursor-pointer bg-[#ffc36d] hover:bg-[#ff6b00] active:bg-[#ffc36d] rounded-[5px] transition-all duration-100">
                            <span className="text-[14px] text-[#292929] font-bold leading-none">Proceed</span>
                        </button>
                    </div>
                </div>  
            )}
            
            <div onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={()=>setDragOver(false)}
                className={`flex ${files.length > 0 ? 'items-start justify-center' : 'items-center justify-center'} w-full min-h-[300px] h-fit max-h-full p-[1rem]
                overflow-y-auto thin-scrollbar`}
            >
                {files.length < 1 ? (
                    <div className="flex flex-col items-center gap-[0.5rem]">
                        <UploadFileButton handleFileChange={handleFileChange} />
                        <span className="text-[14px] text-[#461704] opacity-75">or drop your files here</span>
                    </div>
                ):(
                    <div className="grid grid-cols-2 items-center justify-center gap-[0.5rem] w-full">
                        {files.map((file, index) => (
                            <DocumentItem key={`${file.name}-${file.size}-${file.lastModified}`} 
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