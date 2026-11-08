
import type { Order } from "../../../types/order.type";
import currencyFormat from "../../../utils/currencyFormat";
import { formatDate } from "../../../utils/formatDate";


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
        <button onClick={viewOrder} className="group grid grid-cols-5 place-items-center w-full py-[1.5rem]  bg-gradient-to-r from-transparent via-[#ff6b00] to-transparent hover:via-[#cc4c02] cursor-pointer active:to-[#cc4c02] active:from-[#cc4c02] border-b border-[#fff8ec]/50 transition-all duration-200">
            <span className="text-[16px] text-[#292929] font-bold leading-none">{order.reference_number}</span>
            <span className="text-[16px] text-[#292929] font-bold leading-none">{order.number_of_files} file/s</span>
            <span className="text-[16px] text-[#292929] font-bold leading-none">{currencyFormat(Number(order.total_paid))}</span>
            <span className="text-[16px] text-[#292929] font-bold p-[0.3rem] px-[0.5rem] leading-none bg-[#ffc36d] rounded-full">{order.status}</span>
            <span className="text-[16px] text-[#292929] font-bold p-[0.3rem] px-[0.5rem] leading-none bg-[#ffc36d] rounded-full">{formatDate(order.updated_at)}</span>
        </button>
    )
}

export default OrderItem;