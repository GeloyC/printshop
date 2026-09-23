
// icons
import PDFIcon from '/src/assets/icon/pdf-icon.svg?react'
import DOCXIcon from '/src/assets/icon/word-icon.svg?react'
import Settings from '/src/assets/icon/settings.svg?react'
import Close from '/src/assets/icon/delete.svg?react'
import type { fileItem } from '../../../types/FileType'


interface DocumentItemProp  {
    file: fileItem
    handleRemoveFile: ()=>void
    onSelectFile: ()=>void
}

function DocumentItem ({ 
    file,
    handleRemoveFile,
    onSelectFile,
}:DocumentItemProp) {

    

    return (
        <div className={`fade-up relative group flex items-end w-full p-[0.5rem] pt-[1rem] gap-[0.5rem] bg-[#fff] cursor-pointer shadow-lg border border-[#292929]/35 hover:border-[#292929] rounded-[5px]`}>

            <span className='absolute -top-2 left-5 px-[0.5rem] py-[0.2rem] text-[10px] text-[#292929]/75 font-bold leading-none border border-[#292929]/50 bg-[#fff] rounded-full text-nowrap'>Not yet configured</span>

            {file.file?.type === 'application/pdf' ? <PDFIcon className="size-10 shrink-0" color="#F40F02"/> : <DOCXIcon className="size-10 shrink-0" color="#1B5EBE"/>}
            <div title={file.file.name} className="flex flex-col items-start w-full gap-[0.1rem]">
                <span className="text-[14px] text-[#292929] font-bold w-auto truncate">{file.file.name}</span>
                <span className="text-[12px] font-bold opacity-50">file size: {(file.file.size / 1024).toFixed(2)} kb</span>
            </div>

            <div className="flex justify-end w-full gap-[0.2rem] opacity-0 group-hover:opacity-100 transition-all duration-100">
                <button type="button" title="Configure file" onClick={onSelectFile} className="flex items-center justify-center p-[0.1rem] rounded-[5px] cursor-pointer hover:bg-[#B1B2B5]/50 active:bg-transparent">
                    <Settings className="size-5" />
                </button>
                <button type="button" title="Remove file" onClick={handleRemoveFile} className="flex items-center justify-center p-[0.1rem] rounded-[5px] cursor-pointer hover:bg-[#B1B2B5]/50 active:bg-transparent">
                    <Close className="size-5 opacity-90" />
                </button>
            </div>
        </div>
)
}

export default DocumentItem