import type { OrderItem } from "../../../types/order.type";
import currencyFormat from "../../../utils/currencyFormat";

type OrderFileItemProp = {
    file: OrderItem
}

function OrderFileItem ({ file }: OrderFileItemProp) {

    console.log('check fileData: ', file.configuration.map(opt => opt.option));

    const config = file.configuration.map(opt => opt.option);
    const formattedConfig = config.join(', ');

    return (
        <div className="flex items-start justify-between w-full p-[0.5rem] rounded-[10px] border border-dashed border-[#ffc36d] bg-[#fff8ec]">
            <div className="flex flex-col items-start gap-[0.3rem]">
                <span className='text-[14px] text-[#292929] font-bold leading-none'>{file.metadata.file_name}</span>
                <span className="text-[12px] text-[#292929]/50 font-bold leading-none">{formattedConfig}</span>
                <span className="text-[12px] text-[#292929]/50 font-bold leading-none">{
                    file.quantity > 1 
                        ? `${file.quantity} copies`
                        : `${file.quantity} copy`
                }</span>
            </div>

            <div className="flex">
                <span className="text-[16px] font-bold text-[#292929] leading-none">{currencyFormat(Number(file.total_price))}</span>
            </div>
        </div>
    )
}

export default OrderFileItem;