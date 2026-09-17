

// components
import { type SetStateAction } from "react";
import UploadFileButton from "./UploadFileButton";

// icon
import DocumentItem from "../../../components/client/DocumentViewer/DocumentItem";
import AddFileButton from "./AddFileButton";

interface DisplayFilesProp {
    files: File[]
    setFiles: React.Dispatch<SetStateAction<File[]>>
}

function DisplayFiles ({
    files,
    setFiles
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

    const handleRemoveFile  = (index:number) => {
        setFiles(files => 
                Array.from(files).filter((item, idx) => idx !== index)
        )
    }


    return (
        <div className="fade-up flex flex-col w-full h-full gap-[1rem]">
            <div className="flex items-center justify-center w-full h-full bg-[#fff] border border-dashed border-[#ff6b00]/50 px-[1rem]">
                {files.length < 1 ? (
                    <UploadFileButton handleFileChange={handleFileChange} />
                ):(
                    <div className="flex flex-wrap items-center justify-center gap-[0.5rem] ">
                        {files.map((file, index) => (
                            <DocumentItem key={index} 
                                file={file} 
                                handleRemoveFile={()=>handleRemoveFile(index)}
                            />
                        ))}
                    </div>
                )}
            </div>


            {/* Might make this into a separate component later */}
            <div className="flex items-center justify-center w-full gap-[0.3rem]">
                <AddFileButton handleAddFiles={handleAddFiles} />

                <button className="bg-[#ff6b00] hover:bg-[#cc4c02]/90 active:bg-[#ff6b00] px-[2rem] p-[0.75rem] cursor-pointer">
                    <span className="text-[#fff]">Continue</span>
                </button>
            </div>
        </div>
    )
}

export default DisplayFiles;