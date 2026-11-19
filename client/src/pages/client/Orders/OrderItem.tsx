
import type { Order } from "../../../types/order.type";
import currencyFormat from "../../../utils/currencyFormat";
import { formatDate } from "../../../utils/formatDate";

import Document from '/src/assets/icon/document.svg?react'


type FolderItem = {
    viewOrder: () => void;
    order: Order
}

function OrderItem ({
    viewOrder,
    order
}:FolderItem) {

    /*
    * Links to item page based on reference number when clicked
    * get the reference_number data from the url
    * use search_params to get the reference number
    * 
    * change the path of the Link tag to '/folder/[reference_number] ex. /folder/123ABC456DEF
    */

    return (
        <div onClick={viewOrder} className="group grid grid-rows-[6fr_4fr] w-full h-[150px] border-2 border-[#ffc36d] rounded-[25px] shadow-sm cursor-pointer hover:rotate-1 active:scale-98 transition-all duration-100 overflow-hidden">
            <div className="flex items-start justify-between w-full bg-[#fff0d3] group-hover:bg-[#ffdca5]/75 p-[1.5rem] border-b border-dashed border-[#ff6b00]/50 transition-all duration-100">
                <div className="flex flex-col gap-[0.2rem]">
                    <span className="text-sm text-[#292929] leading-none">Reference #</span>
                    <span className="text-2xl text-[#ff6b00] leading-none font-bold">{order?.reference_number}</span>
                </div>

                <div className="flex bg-[#fafafa] border border-[#292929]/50 rounded-[5px] p-[0.3rem] px-[0.5rem] -rotate-2">
                    <span className="text-md text-[#292929] leading-none font-bold">{order?.status}</span>
                </div>
            </div>

            <div className="flex items-center justify-between w-full px-[1.5rem] bg-[#ffdca5] group-hover:bg-[#ffc36d]/90 transition-all duration-100">
                <div className="flex items-center gap-[0.5rem]">
                    <Document className="size-4 opacity-75" color="#292929"/>
                    <span className="text-md text-[#292929]">{`${order.number_of_files} document(s)`}</span>
                </div>
                <div className="flex items-center gap-[0.3rem]">
                    <span className="text-sm text-[#292929]/75 leading-none">Order total:</span>
                    <span className="text-2xl text-[#292929] font-bold leading-none">{currencyFormat(Number(order.total_paid))}</span>
                </div>
            </div>
        </div>
    )
}

export default OrderItem;