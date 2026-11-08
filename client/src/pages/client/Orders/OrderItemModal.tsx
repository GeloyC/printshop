
// icons
import Close from '/src/assets/icon/close.svg?react'


// components
import OrderFileItem from './OrderFileItem';
import OrderStatus from './OrderStatus';
import type { OrderData, OrderItem } from '../../../types/order.type';
import currencyFormat from '../../../utils/currencyFormat';

type OrderItemModalProp = {
    closeModal: () => void;
    data?: OrderData
}

function OrderItemModal ({
    closeModal,
    data
}: OrderItemModalProp) {

    // const order_items = JSON.parse(String(data?.order_items));

    const orderItems: OrderItem[] = data?.order_items
        ? JSON.parse(data.order_items)
        : [];

    console.log('check data', data);

    return (
        <div className="fade-up relative flex flex-col w-[700px] p-[2rem] gap-[2rem] bg-[#fff] rounded-[20px]">
            <div className="flex items-center gap-[0.3rem] w-full">
                <span className="text-2xl text-[#292929] font-bold leading-none">Order {data?.reference_number}</span>
            </div>

            <button onClick={closeModal} className='absolute top-3 right-3 cursor-pointer rounded-full hover:bg-[#404040]/25 active:bg-transparent transition-all duration-200'>
                <Close className="size-6" />
            </button>

            <div className='grid grid-cols-[3fr_6fr] w-full gap-[1rem]'>
                <OrderStatus 
                    status={data?.status}
                    current_status={data?.current_status}
                    updated_at={data?.status_changed_at}
                />

                <div className="flex flex-col items-center items-start gap-[1rem]">

                    <div className="flex flex-col items-center justify-between w-full gap-[0.5rem]">
                        <div className="flex items-center justify-start w-full gap-[0.3rem]">
                            <span className="text-[14px] text-[#292929]/50 font-bold leading-none">Item/s</span>
                        </div>

                        <div className='flex flex-col gap-[0.3rem] w-full'>
                            {orderItems.map((item: OrderItem) => (
                                <OrderFileItem key={item.id}
                                    file={item}
                                />
                            ))}
                        </div>
                    </div>


                    
                </div>
            </div>

            <div className='flex items-center justify-between gap-[0.3rem]'>
                <button disabled={data?.current_status !== 'Order placed'}
                    className={`group py-[0.5rem] w-[150px] rounded-[10px] ${data?.current_status === 'Order placed' ? 'bg-[#292929] active:bg-[#141414] text-[#fff] hover:text-[#ff0000] cursor-pointer' : 'cursor-not-allowed opacity-50'} bg-[#292929] active:bg-[#141414] transition-all duration-200`}
                >
                    <span className='text-[14px] font-bold leading-none transition-all duration-200'>Cancel Order</span>
                </button>

                <div className="flex items-center justify-end w-full gap-[0.5rem]">
                    <span className="text-[14px] text-[#292929] font-bold opacity-50 leading-none">Total payment: </span>
                    <span className="text-[20px] text-[#ff6b00] font-bold leading-none">{currencyFormat(Number(data?.order_total))} </span>
                </div>
            </div>
        </div>
    )
}

export default OrderItemModal;