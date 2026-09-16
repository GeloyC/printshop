

// components
import { useEffect, useState, type SetStateAction } from "react";
import UploadFileButton from "./UploadFileButton";

interface DisplayFilesProp {
    files: File[]
    setFiles: React.Dispatch<SetStateAction<File[]>>
}

function DisplayFiles ({
    files,
    setFiles
}:DisplayFilesProp) {

    const [filePreview, setFilePreview] = useState<string[]>();


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = Array.from(e.target.files ?? []);
        if (!files) return;

        setFiles(files);
        
        const previews = files.map(arr => {
            const url = URL.createObjectURL(arr);
            return url;
        });

        setFilePreview(previews);
        
        console.log(typeof files, files);
    }

    useEffect(() => {

    }, [files])

    return (
        <div className="fade-up flex flex-col w-full h-full gap-[1rem]">
            <div className="flex flex-wrap items-center justify-center w-full h-full bg-[#fff] border border-dashed border-[#ff6b00]/50">
                <div className="flex flex-col gap-[0.3rem]">
                    <UploadFileButton 
                        handleFileChange={handleFileChange}
                    />
                    <span>Display the files here</span>
                    {files.map((file, index) => (
                        <span key={index}>{file.name}</span>
                    ))}

                    {filePreview?.map(prev => (
                        <>
                            <span>file preview: {prev}</span>
                            <img src={prev} alt="" />
                        </>
                    ))}
                </div>
            </div>


            {/* Might make this into a separate component later */}
            <div className="flex items-center justify-center w-full">
                <button className="bg-[#ff6b00] hover:bg-[#cc4c02]/90 active:bg-[#ff6b00] px-[2rem] p-[0.75rem] cursor-pointer">
                    <span className="text-[#fff]">Continue</span>
                </button>
            </div>
        </div>
    )
}

export default DisplayFiles;