
import { useEffect, useState } from "react"

// components
import OrderItem from "./OrderItem"
import ModalWrapper from "../../../components/wrapper/ModalWrapper"
import OrderItemModalProp from "./OrderItemModal"
import StatusTab from "./StatusTab"
import type { SetURLSearchParams } from "react-router-dom"
import type { Order } from "../../../types/order.type"
import { useGetOrderItemData } from "../../../hooks/cart/order_item.hook"

type OrdersFormProp = {
    setSearchParams: SetURLSearchParams
    status: string
    orders: Order[],
}

function OrdersForm ({
    setSearchParams,
    status,
    orders 
}: OrdersFormProp) {

    const [isItemModalOpen, setIsItemModalOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string|null>(null)

    const handleViewOrderData = (item_id: string) => {
        setSelectedId(item_id);
        setIsItemModalOpen(true);
    }

    const { data: itemData } = useGetOrderItemData(String(selectedId) ?? '', !!selectedId)



    

    return (
        <>
            <div className="flex flex-1 flex-col w-full h-full py-[1rem]">

                <div className="flex items-center justify-between w-full gap-[2rem] px-[1rem]">
                    <span className="text-[24px] text-[#292929] font-bold leading-none">My Orders</span>
                    <StatusTab 
                        setSearchParams={setSearchParams}
                        status={status}
                    />
                </div>

                <div className="flex flex-1 flex-col w-full gap-[1rem] py-[1rem] bg-gradient-to-b from-[#cc4c02] to-[#fff8ec] rounded-t-[15px]">
                    
                    <div className="grid grid-cols-5 place-items-center w-full ">
                        {/* 
                            reference number
                            number of files
                            total payment
                            status
                            updated date
                        */}

                        <span className="text-[14px] text-[#fff]/80 leading-tight">Reference number</span>
                        <span className="text-[14px] text-[#fff]/80 leading-tight">No. of file/s</span>
                        <span className="text-[14px] text-[#fff]/80 leading-tight">Total paid</span>
                        <span className="text-[14px] text-[#fff]/80 leading-tight">Status</span>
                        <span className="text-[14px] text-[#fff]/80 leading-tight">Date</span>
                    </div>

                    <div className="flex flex-col w-full">
                        
                        {orders.map(order => (
                            <OrderItem key={order.id}
                                viewOrder={()=>handleViewOrderData(order.id)}
                                order={order}
                                
                            />
                        ))}
                    </div>
                    
                </div>
            </div>

            {isItemModalOpen && (
                <ModalWrapper>
                    <OrderItemModalProp 
                        closeModal={()=>setIsItemModalOpen(false)}
                        data={itemData}
                    />
                </ModalWrapper>
            )}
        </>
    )
}


export default OrdersForm;