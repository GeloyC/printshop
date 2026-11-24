
// icons
import PDFIcon from '/src/assets/icon/pdf-icon.svg?react'
import DOCXIcon from '/src/assets/icon/word-icon.svg?react'
import ImageIcon from '/src/assets/icon/image-icon.svg?react'
import Settings from '/src/assets/icon/settings.svg?react'
import Delete from '/src/assets/icon/delete.svg?react'
import Check from '/src/assets/icon/check.svg?react'


import type { fileItem } from '../../../types/file.type'
import currencyFormat from '../../../utils/currencyFormat'
import { getDocxPageCount } from '../../../utils/getDocxPageCount'


interface DocumentItemProp  {
    file: fileItem
    handleRemoveFile: ()=>void
    onSelectFile: ()=>void
    onCancel: () => void
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
        // <div onClick={onSelectFile} className={`fade-up group flex items-center w-full gap-[0.5rem] p-[1rem] border-b border-dashed border-[#292929]/25 hover:bg-[#ff6b00]/25 cursor-pointer transition-all duration-200`}>


        //     <div className='flex items-center gap-[0.3rem] w-full'>
        //         {isConfigured
        //             ? <Check className="size-6" color="#292929" />
        //             : <div className='flex items-center justify-center gap-[0.5rem]'>
        //                 {
        //                     file.file?.type === 'application/pdf' 
        //                         ? <PDFIcon className="size-6" color="#F40F02"/> 
        //                         : file.file?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        //                             ? <DOCXIcon className="size-6 shrink-0" color="#1B5EBE"/>
        //                             : file.file?.type === 'image/png' 
        //                                 ? <ImageIcon className='size-6 shrink-0' color="#292929"/>
        //                                 : <ImageIcon className='size-6 shrink-0' color="#292929" />
        //                 }
        //             </div>
        //         }

        //         <div title={file.file?.name} className="flex flex-col items-start w-full gap-[0.1rem]">
        //             <span className="text-md text-[#292929] text-wrap font-bold">{file.file?.name}</span>
        //             {/* <span className="text-[12px] font-bold opacity-50">file size: {(file.file.size / 1024).toFixed(2)} kb</span> */}
        //         </div>
        //     </div>

        //     <div className="flex items-center justify-end w-full gap-[0.2rem] transition-all duration-100">
        //         <button type="button" title="Remove file" onClick={handleRemoveFile} className="flex items-center justify-center hover:bg-[#fff0d3] active:bg-transparent p-[0.5rem] px-[1rem] rounded-full cursor-pointer transition-all duration-100">
        //             <span className='text-[12px] font-bold text-[#292929] leading-none'>REMOVE</span>
        //         </button>

        //         {/* <button type="button" title="Configure file" onClick={()=> {
        //             onSelectFile();
        //             console.log('selected file: ', file);
        //         }} className="flex items-center justify-center bg-[#292929] hover:bg-[#141414] active:bg-[#292929]/90 p-[0.5rem] px-[1rem] rounded-full cursor-pointer transition-all duration-100">
        //             <span className='text-[12px] text-[#fff] leading-none'>
        //                 {!isConfigured 
        //                     ? 'CONFIGURE'
        //                     : 'EDIT CONFIGURATION'
        //                 }
        //             </span>
        //         </button> */}
        //     </div>
        // </div>

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