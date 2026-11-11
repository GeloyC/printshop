import type { OrderAdmin } from "../../../types/order.type";
import OrderItemAdmin from "./OrderItemAdmin";


type OrdersAdminFormProp = {
    orders: OrderAdmin[]
}

function OrdersAdminForm ({
    orders,
}: OrdersAdminFormProp) {



    return (
        <div className="flex flex-col w-full h-full bg-[#f2f2f2]">
            <div className="flex items-center justify-between h-[3.5rem] p-[0.75rem] px-[1rem] bg-[#fafafa] border-b border-[#292929]/10">
                <span className="text-xl text-[#292929] font-bold">Orders</span>
                
            </div>


            <div className="flex flex-1 flex-col w-full bg-[#f2f2f2] p-[1rem] gap-[1rem]">
                <div className="grid grid-cols-[1fr_4fr_4fr_4fr_4fr] place-items-start w-full">
                    {/* 
                        count
                        reference number
                        customer name
                        status
                        date
                    */}

                    <input type="checkbox" name="" id="" className="self-center w-full"/>
                    <span className="text-sm text-[#292929] leading-none">Reference #</span>
                    <span className="text-sm text-[#292929] leading-none">Customer</span>
                    <span className="text-sm text-[#292929] leading-none">Status</span>
                    <span className="text-sm text-[#292929] leading-none">Date</span>
                </div>

                <div className="flex flex-col w-full bg-[#fafafa] rounded-[10px] overflow-hidden border border-[#292929]/15 py-[1rem]">
                    {orders.map(order => (
                        <OrderItemAdmin key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OrdersAdminForm;