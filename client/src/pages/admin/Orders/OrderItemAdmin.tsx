import { Link } from "react-router-dom";

import type { OrderAdmin } from "../../../types/order.type";
import { formatDate } from "../../../utils/formatDate";


type OrderItemAdminProp = {
    order: OrderAdmin
}

function OrderItemAdmin ({
    order,
}: OrderItemAdminProp) {

    

    return (
        <div 
            className="grid grid-cols-[1fr_4fr_4fr_4fr_4fr] w-full bg-[#fafafa] hover:bg-[#f2f2f2] border-b border-[#292929]/10 transition-all duration-200"
        >
            <div className="flex items-center justify-center p-[0.75rem]">
                <input type="checkbox" name="" id="" />
            </div>

            <Link to={`/admin/orders/${order.reference_number}`} className="flex items-center justify-start w-full py-[0.75rem]">
                <span className="text-sm text-[#292929] font-bold leading-none hover:underline cursor-pointer">{order.reference_number}</span>
            </Link>

            <div className="flex items-center justify-start w-full py-[0.75rem]">
                <span className="text-sm text-[#292929] leading-none">{order.customer_name}</span>
            </div>

            <div className="flex items-center justify-start w-full py-[0.75rem]">
                <span 
                    className=
                        {`text-sm leading-none p-[0.3rem] px-[0.5rem] rounded-[10px]
                            ${order.status === 'Order placed' 
                                    ? 'text-[#fff] bg-[#ff6b00]'
                                    : order.status === 'Order confirmed'
                                        ? 'text-[#292929]'
                                        : order.status === 'Processing'
                                            ? 'text-[#292929]'
                                            : order.status === 'Ready-for-pickup'
                                                ? 'text-[#292929]'
                                                : 'text-[#fff] bg-[#15803d]'
                            }
                        `}
                >
                    {order.status}
                </span>
            </div>

            <div className="flex items-center justify-start w-full py-[0.75rem]">
                <span className="text-sm text-[#292929] leading-none">{formatDate(String(order.updated_at))}</span>
            </div>
        </div>
    )
}


export default OrderItemAdmin;