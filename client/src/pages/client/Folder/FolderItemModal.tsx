
// icons
import Service from '/src/assets/icon/service.svg?react'
import Reference from '/src/assets/icon/receipt.svg?react'
import Document from '/src/assets/icon/document.svg?react'
import Close from '/src/assets/icon/close.svg?react'

// components
import OrderItem from './OrderItem';

type FolderItemModalProp = {
    closeModal: () => void;
}

function FolderItemModal ({
    closeModal
}: FolderItemModalProp) {

    return (
        <div className="fade-up relative flex flex-col w-[500px] p-[2rem] gap-[1rem] bg-[#fff] rounded-[5px]">
            <div className="flex items-center gap-[0.3rem] w-full">
                <span className="text-[20px] text-[#292929] font-bold leading-none">Order details</span>
            </div>

            <button onClick={closeModal} className='absolute top-3 right-3 cursor-pointer rounded-full hover:bg-[#404040]/25 active:bg-transparent transition-all duration-200'>
                <Close className="size-6" />
            </button>

            <div className="flex flex-col items-center items-start gap-[1rem]">

                <div className='flex flex-col gap-[0.3rem] w-full'>
                    <div className="flex items-center justify-between w-full p-[0.5rem] rounded-[5px] bg-[#f2f2f2]/50">
                        <div className="flex items-center gap-[0.3rem]">
                            <Reference className="size-4 opacity-50" color="#292929" />
                            <span className="text-[14px] text-[#292929]/50 font-bold leading-none">Reference no.</span>
                        </div>

                        <div className="flex">
                            <span className="text-[16px] font-bold text-[#292929] leading-none">123ABC456DEF</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full p-[0.5rem] rounded-[5px] bg-[#f2f2f2]/50">
                        <div className="flex items-center gap-[0.3rem]">
                            <Service className="size-4 opacity-50" color="#292929" />
                            <span className="text-[14px] text-[#292929]/50 font-bold leading-none">Service</span>
                        </div>

                        <div className="flex">
                            <span className="text-[16px] font-bold text-[#292929] leading-none">Document Print</span>
                        </div>
                    </div>
                </div>



                <div className="flex flex-col items-center justify-between w-full pt-[1rem] gap-[0.5rem] border-t border-dashed border-[#292929]/25">
                    <div className="flex items-center justify-start w-full gap-[0.3rem]">
                        <Document className="size-4 opacity-50" color="#292929" />
                        <span className="text-[14px] text-[#292929]/50 font-bold leading-none">Order item/s</span>
                    </div>

                    <div className='flex flex-col gap-[0.3rem] w-full'>
                        {/* Item block */}
                        <OrderItem />
                        <OrderItem />
                    </div>
                </div>



                <div className="flex items-center justify-end w-full gap-[0.5rem]">
                    <span className="text-[14px] text-[#292929] font-bold opacity-50 leading-none">Total payment: </span>
                    <span className="text-[20px] text-[#ff6b00] font-bold leading-none">Php 7.00 </span>
                </div>
            </div>
        </div>
    )
}

export default FolderItemModal;