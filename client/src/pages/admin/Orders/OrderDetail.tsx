import { useState } from "react";


import { useParams } from "react-router-dom";
import { useGetOrderDetail, useUpdateOrderStatus } from "../../../hooks/orders/order.hook";
import type { OrderData } from "../../../types/order.type";
import StatusDropdown from "../../../components/admin/Order/StatusDropdown";


function OrderDetail () {

    const { reference_number } = useParams();
    const { data: orderData } = useGetOrderDetail(String(reference_number))
    const order: OrderData = orderData;


    const [currentStatus, setCurrentStatus] = useState<string>(order?.status);
    const { 
        mutate:handleUpdateOrderStatus, 
        isPending:updateStatusPending 
    } = useUpdateOrderStatus(order?.reference_number, currentStatus);

    return (
        <div className="flex flex-col w-full h-full bg-[#f2f2f2]">
            <div className="flex items-center justify-between h-[3.5rem] p-[0.75rem] px-[1rem] bg-[#fafafa] border-b border-[#292929]/10">
                <span className="text-xl text-[#292929] font-bold">Order details</span>
            </div>

            <div className="flex w-full p-[1rem] px-[8rem]">

                <div className="flex flex-col w-full bg-[#fafafa] rounded-[10px] border border-[#292929]/15 gap-[1rem]">
                    
                    <div className="flex items-center justify-between gap-[2rem] p-[1rem] w-full">
                        <div className="flex items-center gap-[0.5rem]">
                            <span className="text-sm text-[#292929]/80">Ordered by: </span>
                            <span className="text-sm text-[#292929] font-bold">{order?.customer_name}</span>
                        </div>

                        <div className="flex items-center gap-[1rem]">
                            <div className="flex items-center gap-[0.5rem] px-[1rem] border-r border-[#292929]/20">
                                <span className="text-sm text-[#292929]/80">Reference #: </span>
                                <span className="text-sm text-[#ff6b00] font-bold">{order?.reference_number}</span>
                            </div>

                            <StatusDropdown 
                                status={order?.status}
                                currentStatus={currentStatus}
                                setCurrentStatus={setCurrentStatus}
                                handleUpdateOrderStatus={handleUpdateOrderStatus}
                                updateStatusPending={updateStatusPending}
                            />
                        </div>


                    </div>
                    
                </div>

            </div>
            
        </div>
    )
}

export default OrderDetail;