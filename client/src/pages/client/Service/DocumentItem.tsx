
// icons
import PDFIcon from '/src/assets/icon/pdf-icon.svg?react'
import DOCXIcon from '/src/assets/icon/word-icon.svg?react'
import ImageIcon from '/src/assets/icon/image-icon.svg?react'
import Delete from '/src/assets/icon/delete.svg?react'
import Check from '/src/assets/icon/check.svg?react'


import type { fileItem } from '../../../types/file.type'
import currencyFormat from '../../../utils/currencyFormat'
import { getDocxPageCount } from '../../../utils/getDocxPageCount'


interface DocumentItemProp  {
    file: fileItem
    handleRemoveFile: ()=>void
    onSelectFile: ()=>void
    selectedFile: fileItem|null
}

function DocumentItem ({ 
    file,
    handleRemoveFile,
    onSelectFile,
    selectedFile
}:DocumentItemProp) {
    

    const isConfigured = !!file.configuration?.length;
    const isSelected = selectedFile?.id === file.id;

    console.log('files: ', file.total_price);
    
    



    return (
        <div 
            className={`flex items-center justify-start w-full h-[75px] transition-all duration-100 cursor-pointer overflow-hidden border-b border-[#404040]/15`}
        >
            <div onClick={onSelectFile}  
                className={
                    `group flex flex-col w-full justify-center p-[1rem] gap-[0.5rem] h-full transition-all duration-100 
                    ${isSelected 
                        ? 'bg-[#404040]' 
                        : isConfigured
                            ? 'bg-[#CCFFCC]/50 hover:bg-[#CCFFCC]/75 active:bg-transparent'   
                            : 'hover:bg-[#B1B2B5]/25 active:bg-[#B1B2B5]/50'
                    }
                `}
            >
                <div className='flex items-start justify-center w-full gap-[1rem]'>

                    {isConfigured 
                        ? <div className='rounded-full bg-[#498d49] p-[0.2rem]'>
                            <Check className="size-7" color={`${isSelected ? '#fafafa' : '#fafafa'}`} />
                        </div>
                        : <>
                            {
                                file.file?.type === 'application/pdf' 
                                    ? <PDFIcon className="size-8" color={`${isSelected ? '#fafafa' : '#292929' }`}/> 
                                    : file.file?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
                                        ? <DOCXIcon className="size-8 shrink-0" color={`${isSelected ? '#fafafa' : '#292929' }`}/>
                                        : file.file?.type === 'image/png' 
                                            ? <ImageIcon className='size-8 shrink-0' color={`${isSelected ? '#fafafa' : '#292929' }`}/>
                                            : <ImageIcon className='size-8 shrink-0' color={`${isSelected ? '#fafafa' : '#292929' }`} />
                            }
                        </>
                    }

                    <div className='flex flex-col flex-wrap items-start w-full gap-[0.5rem]'>
                        <span 
                            className={
                                `text-md 
                                ${isSelected 
                                    ? 'text-[#fafafa]' 
                                    : isConfigured
                                        ? 'text-[#498d49] group-hover:underline'
                                        : 'text-[#292929] group-hover:underline'
                                } 
                                break-all text-wrap leading-none font-bold 
                            `}
                        >
                            {file?.file.name}
                        </span>

                        <div className='flex items-center jsutify-end w-full gap-[0.3rem]'>
                            <span className={`text-sm ${isSelected ? 'text-[#fafafa]' : isConfigured ? 'text-[#498d49]' : 'text-[#292929]'} leading-none`}>{(file.file.size / 1024).toFixed(2)} kB</span>
                            
                            {file?.pageCount !== 0 && (
                                <span className={`text-sm ${isSelected ? 'text-[#fafafa]' : isConfigured ? 'text-[#498d49]' : 'text-[#292929]'} leading-none`}>({file?.pageCount} {Number(file.pageCount )> 1 ? 'pages' : 'page'})</span>
                            )}
                        </div>
                    </div>

                    {isConfigured && <span className='text-md font-bold text-[#498d49]'>{currencyFormat(Number(file.total_price))}</span> }
                </div>

            </div>


            <div className={`flex flex-col h-full`}>
                <button 
                    title='Delete'
                    onClick={handleRemoveFile}
                    disabled={isSelected}
                    className={`group 
                        ${isSelected 
                            ? 'bg-[#404040]' 
                            : isConfigured 
                                ? 'bg-[#CCFFCC]/50 hover:bg-[#CCFFCC]/75 cursor-pointer'
                                : 'hover:bg-[#B1B2B5]/25 active:bg-[#b90000] cursor-pointer'
                        } p-[1rem] h-full transition-all duration-200`}
                >
                    <Delete 
                        className={`size-6 ${isSelected ? 'opacity-10' : 'opacity-50 group-hover:opacity-100 group-active:scale-95'}`} 
                        color={`${isSelected ? '#fafafa' : '#292929' }`}
                    />
                </button>
            </div>
        </div>
    )
}

export default DocumentItem