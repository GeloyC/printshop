import DocumentThumbnail from "./DocumentThumbnail"


interface DocumentItemProp  {
    file: File
    handleRemoveFile: ()=>void
}

function DocumentItem ({ 
    file,
    handleRemoveFile
}:DocumentItemProp) {

    return (
        <div className="relative group flex flex-col items-center w-[200px] p-[0.5rem] gap-[0.5rem] bg-[#ffdca5]">
        
            <span className="text-[14px] font-bold w-[150px] truncate">{file.name}</span>

            <div className="flex items-center justify-center w-full overflow-hidden group-hover:opacity-50">
                <DocumentThumbnail file={file}/>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[0.3rem] opacity-0 group-hover:opacity-100 transition-all duration-100">
                <button className="w-[100px] py-[0.5rem] bg-[#292929]/75 hover:bg-[#292929] active:bg-[#292929]/50 cursor-pointer">
                    <span className="text-[14px] text-[#fff] font-bold">Configure</span>
                </button>

                <button onClick={handleRemoveFile} className="w-[100px] py-[0.5rem] bg-[#292929]/75 hover:bg-[#292929] active:bg-[#292929]/50 cursor-pointer">
                    <span className="text-[14px] text-[#fff] font-bold">Remove</span>
                </button>
            </div>
        </div>
)
}

export default DocumentItem