
// components
import { type SetStateAction } from "react";
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


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = Array.from(e.target.files ?? []);
        if (!files) return;

        setFiles(files);
    }

    const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = Array.from(e.target.files ?? []);
        if (!files) return;

        setFiles(items => [...Array.from(items), ...files]);
    }

    const handleRemoveFile = (index:number) => {
        setFiles(files => 
            Array.from(files).filter((item, idx) => 
                idx !== index
            )
        )
    }


    return (
        <div className={`fade-up flex flex-col w-full h-[600px] gap-[1rem] bg-[#fff8ec] border-2 border-dashed border-[#ffdca5] p-[1rem] rounded-[10px]`}>
            {files.length > 0 && (
                <span className="text-center text-[14px] text-[#82330c] font-bold bg-[#ffc36d]/50 w-fit px-[0.5rem] py-[0.3rem] rounded-[5px]">Total files: {files.length}</span>
            )}
            <div className={`flex ${files.length > 0 ? 'items-start justify-start' : 'items-center justify-center'} w-full h-full overflow-y-auto thin-scrollbar`}>
                {files.length < 1 ? (
                    <UploadFileButton handleFileChange={handleFileChange} />
                ):(
                    <div className="flex flex-wrap items-center justify-center gap-[0.5rem] ">
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


            {/* Might make this into a separate component later */}
            <div className="flex items-center justify-center w-full gap-[0.3rem]">

                {files.length > 0 && <AddFileButton handleAddFiles={handleAddFiles} /> }
                
                {/* Show this button if all the files are configured */}
                {files.length > 0 && (
                    <button className={`bg-[#ff6b00] hover:bg-[#cc4c02]/90 active:bg-[#ff6b00] px-[2rem] p-[0.75rem] cursor-pointer rounded-[5px]`}>
                        <span className="text-[#fff]">Continue</span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default DisplayFiles;