
// icons
import PDFIcon from '/src/assets/icon/pdf-icon.svg?react'
import DOCXIcon from '/src/assets/icon/word-icon.svg?react'
import ImageIcon from '/src/assets/icon/image-icon.svg?react'
import Settings from '/src/assets/icon/settings.svg?react'
import Close from '/src/assets/icon/delete.svg?react'


import type { fileItem } from '../../../types/FileType'


interface DocumentItemProp  {
    file: fileItem
    handleRemoveFile: ()=>void
    onSelectFile: ()=>void
    onCancel: () => void
}

function DocumentItem ({ 
    file,
    handleRemoveFile,
    onSelectFile,
}:DocumentItemProp) {

    const isConfigured = !!file.configuration?.length;

    return (
        <div className={`fade-up relative group flex items-start w-full p-[1rem] gap-[0.5rem] bg-[#ffdca5] cursor-pointer rounded-[10px] transition-all duration-200`}>
            
            <span className={`absolute bottom-3 left-3 px-[0.5rem] py-[0.2rem] text-[10px]  font-bold leading-none ${isConfigured ? 'text-[#498d49] bg-[#CCFFCC]' : 'text-[#292929]/75 bg-[#fff]'} rounded-full text-nowrap`}>
                {
                    isConfigured
                        ? 'CONFIGURED'
                        : 'NOT YET CONFIGURED' 
                }
            </span>

            {
                file.file?.type === 'application/pdf' 
                    ? <PDFIcon className="size-10 shrink-0" color="#F40F02"/> 
                    : file.file?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
                        ? <DOCXIcon className="size-10 shrink-0" color="#1B5EBE"/>
                        : file.file?.type === 'image/png' 
                            ? <ImageIcon className='size-10 shrink-0' />
                            : <ImageIcon className='size-10 shrink-0' />
            }

            <div className='flex flex-col w-full'>
                <div title={file.file?.name} className="flex flex-col items-start w-full gap-[0.1rem]">
                    <span className="text-[16px] text-[#292929] font-bold w-[500px] truncate">{file.file?.name}</span>
                    <span className="text-[12px] font-bold opacity-50">file size: {(file.file.size / 1024).toFixed(2)} kb</span>
                </div>

                <div className="flex justify-end w-full gap-[0.2rem]  transition-all duration-100">
                    <button type="button" title="Configure file" onClick={onSelectFile} className="flex items-center justify-center bg-[#292929] hover:bg-[#141414] active:bg-[#292929]/90 p-[0.5rem] px-[1rem] rounded-full cursor-pointer transition-all duration-100">
                        {/* <Settings className="size-5" /> */}
                        <span className='text-[12px] text-[#fff] leading-none'>
                            {!isConfigured 
                                ? 'CONFIGURE'
                                : 'EDIT CONFIGURATION'
                            }
                        </span>
                    </button>
                    <button type="button" title="Remove file" onClick={handleRemoveFile} className="flex items-center justify-center bg-[#ff0000] hover:bg-[#b90000] active:bg-[#ff0000] p-[0.5rem] px-[1rem] rounded-full cursor-pointer transition-all duration-100">
                        {/* <Close className="size-5 opacity-90" /> */}
                        <span className='text-[12px] text-[#fff] leading-none'>REMOVE</span>
                    </button>
                </div>
            </div>

        </div>
)
}

export default DocumentItem