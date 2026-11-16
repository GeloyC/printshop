import type { SetStateAction } from "react";
import type { OrderItem } from "../../../types/order.type";

// icons
import PDFIcon from '/src/assets/icon/pdf-icon.svg?react';
import DOCXIcon from '/src/assets/icon/word-icon.svg?react';
import ImageIcon from '/src/assets/icon/image-icon.svg?react';



type OrderItemConfigurationProp = {
    isSelectedFileIdOpen: string|null,
    setIsSelectedFileIdOpen: React.Dispatch<SetStateAction<string|null>>
    itemDetail: OrderItem|undefined
}

function OrderItemConfiguration ({
    isSelectedFileIdOpen,
    setIsSelectedFileIdOpen,
    itemDetail
}: OrderItemConfigurationProp) {

    

    return (
        <div className={`flex flex-1 h-full ${isSelectedFileIdOpen ? 'min-w-[400px]' : 'w-[0px]'} transition-all duration-300`}>
            {isSelectedFileIdOpen && (
                <div className="flex flex-1 flex-col w-full bg-[#fafafa] border-l border-[#292929]/15 overflow-hidden">
                    <div className="flex justify-between items-center p-[1rem] w-full bg-[#fafafa] border-b border-[#292929]/15">
                        <div className="flex items-center gap-[0.5rem]">
                            {
                                itemDetail?.metadata.file_type === 'application/pdf'
                                    ? <PDFIcon className="size-5" />
                                    : itemDetail?.metadata.file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                        ? <DOCXIcon className="size-5" />
                                        : <ImageIcon className="size-5" />
                            }
                            <span className="text-sm text-wrap text-[#292929] leading-none font-bold">{itemDetail?.metadata.file_name}</span>
                        </div>

                        <button 
                            onClick={()=>setIsSelectedFileIdOpen(null)} 
                            className="flex opacity-50 hover:opacity-100 active:opacity-25 cursor-pointer transition-all duration-200"
                        >
                            <span className="text-sm text-[#b90000] leading-none font-bold">Close</span>
                        </button>
                    </div>

                    <div className="flex flex-col w-full p-[1rem] gap-[0.5rem] border-b border-[#292929]/15">
                        <span className="text-sm text-[#292929]/75 font-bold">Metadata</span>
                        
                        <div className="flex flex-col w-full gap-[0.5rem]">

                            <div className="flex flex-1 flex-col items-start border-r border-[#292929]/15">
                                <span className="text-sm text-[#292929]">Page/s: </span>
                                <span className="text-sm text-[#292929] font-bold">3 Pages</span> {/* Modify this after file analyzer */}
                            </div>

                            <div className="flex flex-1 flex-col items-start">
                                <span className="text-sm text-[#292929]">Size: </span>
                                <span className="text-sm text-[#292929] font-bold">
                                {(Number(itemDetail?.metadata.file_size)/1024).toFixed(2)} kB
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={`flex flex-col w-full p-[1rem] gap-[0.5rem] ${itemDetail?.additional_instruction && 'border-b border-[#292929]/15'}`}>
                        <span className="text-sm text-[#292929]/75 font-bold">Configuration</span>
                        
                        <div className="flex flex-col w-full gap-[0.3rem]">
                            {itemDetail?.configuration.map(config => (
                                <div key={config.id} className="flex flex-col items-start">
                                    <span className="text-sm text-[#292929]">{config.category}: </span>
                                    <span className="text-sm text-[#292929] font-bold">{config.option}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {itemDetail?.additional_instruction && (
                        <div className="flex flex-col w-full p-[1rem] gap-[0.5rem]">
                            <span className="text-sm text-[#292929]/75 font-bold">Additional instruction</span>
                            
                            <div className="flex flex-col items-start">
                                <span className="text-sm text-[#292929]">{itemDetail?.additional_instruction}</span>
                            </div>
                        </div>
                    )}
                </div> 
            )}
        </div>
    )
}

export default OrderItemConfiguration;