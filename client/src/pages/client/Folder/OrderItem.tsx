
// import type { Configuration } from "../../../types/service/service";

/*

type OrderItemProp = {
    filename: string,
    configuration: Configuration,
    quantity: number
    price: number
}

*/

function OrderItem () {

    return (
        <div className="flex items-start justify-between w-full p-[0.5rem] rounded-[10px] border border-dashed border-[#ffc36d] bg-[#fff8ec]">
            <div className="flex flex-col items-start gap-[0.3rem]">
                <span className='text-[14px] text-[#292929] font-bold leading-none'>Filename.docx</span>
                <span className="text-[12px] text-[#292929]/50 font-bold leading-none">Colored, A4</span>
                <span className="text-[12px] text-[#292929]/50 font-bold leading-none">1 Copy</span>
            </div>

            <div className="flex">
                <span className="text-[16px] font-bold text-[#292929] leading-none">Php 3.00</span>
            </div>
        </div>
    )
}

export default OrderItem;