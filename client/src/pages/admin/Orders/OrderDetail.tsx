
import { useParams } from "react-router-dom";
import { useGetOrderDetail } from "../../../hooks/orders/order.hook";
import type { OrderData } from "../../../types/order.type";


function OrderDetail () {

    const { reference_number } = useParams();

    const { data: orderData } = useGetOrderDetail(String(reference_number))

    const order: OrderData = orderData;

    return (
        <div className="flex flex-col w-full h-full bg-[#f2f2f2]">
            <div className="flex items-center justify-between h-[3.5rem] p-[0.75rem] px-[1rem] bg-[#fafafa] border-b border-[#292929]/10">
                <span className="text-xl text-[#292929] font-bold">Order {reference_number}</span>
            </div>

            <div className="flex w-full p-[1rem]">

                <div className="flex flex-col w-full bg-[#fafafa] rounded-[10px] border border-[#292929]/15">
                    <span>{order?.reference_number}</span>
                    <span>{order?.current_status}</span>
                    <span>{order?.order_items}</span>
                    <span>{order?.order_total}</span>
                    <span>{order?.status_changed_at}</span>
                </div>
            </div>
            
        </div>
    )
}

export default OrderDetail;