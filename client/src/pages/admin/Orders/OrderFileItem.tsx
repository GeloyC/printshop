import type { SetStateAction } from "react";
import type { OrderItem } from "../../../types/order.type";

import PDFIcon from '/src/assets/icon/pdf-icon.svg?react';
import DOCXIcon from '/src/assets/icon/word-icon.svg?react';
import ImageIcon from '/src/assets/icon/image-icon.svg?react';

import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";
import currencyFormat from "../../../utils/currencyFormat";

type OrderFileItemProp = {
    item: OrderItem,
    handleDownload: (id: string) => void,
    downloadedFiles: string[],
    downloadPending: boolean,
    downloadingFileId: string|undefined,
    isSelectedFileIdOpen: string|null,
    handleOpenSelectedFile: (id: string) => void,
    setIsSelectedFileIdOpen: React.Dispatch<SetStateAction<string|null>>
}

function OrderFileItem ({
    item,
    handleDownload,
    downloadedFiles,
    downloadPending,
    downloadingFileId,
    isSelectedFileIdOpen,
    handleOpenSelectedFile,
    setIsSelectedFileIdOpen
}: OrderFileItemProp) {

    return (
        <div key={item.id} className={`group flex flex-col w-full border-b border-[#292929]/10 p-[0.75rem] px-[1rem] gap-[0.5rem]  ${isSelectedFileIdOpen === item.id ? 'bg-[#ffc36d]' : 'hover:bg-[#e6e6e6]/50'} transition-all duration-200`}>
            <div className="grid grid-cols-[50%_10%_10%_10%_10%_10%] items-center w-full">

                <div className="flex flex-1 items-center w-full gap-[0.5rem]">
                    {
                        item.metadata.file_type === 'application/pdf'
                            ? <PDFIcon className="size-5" />
                            : item.metadata.file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                ? <DOCXIcon className="size-5" />
                                : <ImageIcon className="size-5" />
                    }
                    <span onClick={()=>handleOpenSelectedFile(item.id)} className="w-fit text-sm text-[#292929] leading-none border-b border-[#292929]/40 hover:border-[#292929] cursor-pointer transition-all duration-100">{item.metadata.file_name}</span>
                </div>
                <span className="text-sm text-[#292929] leading-none">{currencyFormat(Number(item.unit_price))}</span>
                <span className="text-sm text-[#292929] leading-none">{currencyFormat(Number(item.total_price))}</span>
                <span className="text-sm text-[#292929] leading-none">{(item.metadata.file_size / 1024).toFixed(2)} kB</span>
                <span className="text-sm text-[#292929] leading-none">{item.quantity}</span>


                <button 
                    onClick={()=>handleDownload(item.id)} 
                    disabled={downloadingFileId === item.id && downloadPending}
                    className={`flex justify-center gap-[0.3rem] w-full p-[0.3rem] px-[0.75rem] cursor-pointer ${downloadedFiles.includes(item.id) ? 'bg-[#292929]/75' : 'bg-[#498d49] active:bg-[#325e32]'} rounded-full`}
                >
                    <span className="text-sm text-[#fff] leading-none">
                        {downloadingFileId === item.id && downloadPending
                            ? 'Downloading'
                            : downloadedFiles.includes(item.id)
                                ? 'Finished'
                                : 'Download'
                        }
                    </span>
                    {downloadingFileId === item.id && downloadPending && (
                        <LoadingSpinner size={12} color="#fff" />
                    )}
                </button>
            </div>
        </div>
    )
}

export default OrderFileItem;