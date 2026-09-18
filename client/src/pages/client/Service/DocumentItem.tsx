import DocumentThumbnail from "../../../components/client/DocumentViewer/DocumentThumbnail"

// icons
import PDFIcon from '/src/assets/icon/pdf-icon.svg?react'
import DOCXIcon from '/src/assets/icon/word-icon.svg?react'

interface DocumentItemProp  {
    file: File
    handleRemoveFile: ()=>void
    onSelectFile: ()=>void
}

function DocumentItem ({ 
    file,
    handleRemoveFile,
    onSelectFile
}:DocumentItemProp) {

    

    return (
        <div title={file.name} className="relative group flex flex-col w-[225px] p-[1rem] gap-[0.5rem] bg-[#fff] cursor-pointer shadow-lg border border-[#B1B2B5]/50">
            <div className="flex items-center w-full gap-[0.3rem]">
                {file.type === 'application/pdf' ? <PDFIcon className="size-6"/> : <DOCXIcon className="size-6"/>}
                <span className="text-[14px] text-[#292929] font-bold w-[175px] truncate">{file.name}</span>
            </div>

            <div className="flex items-center justify-center w-full overflow-hidden group-hover:opacity-50">
                <DocumentThumbnail file={file}/>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[0.3rem] opacity-0 group-hover:opacity-100 transition-all duration-100">
                <button onClick={onSelectFile} className="w-[100px] py-[0.5rem] bg-[#292929]/75 hover:bg-[#292929] active:bg-[#292929]/50 rounded-[5px] cursor-pointer">
                    <span className="text-[14px] text-[#fff] font-bold">Configure</span>
                </button>

                <button onClick={handleRemoveFile} className="w-[100px] py-[0.5rem] bg-[#292929]/75 hover:bg-[#292929] active:bg-[#292929]/50 rounded-[5px] cursor-pointer">
                    <span className="text-[14px] text-[#fff] font-bold">Remove</span>
                </button>
            </div>
        </div>
)
}

export default DocumentItem