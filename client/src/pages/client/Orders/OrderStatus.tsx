
import Completed from '/src/assets/icon/box-with-check.svg?react';
import ReadyForPickup from '/src/assets/icon/document-success.svg?react';
import Processing from '/src/assets/icon/print.svg?react';
import OrderConfirmed from '/src/assets/icon/save-check.svg?react';
import OrderPlaced from '/src/assets/icon/check.svg?react';

import { formatDate } from '../../../utils/formatDate';
import type { OrderStatusHistoriesType } from '../../../types/order.type';

type OrderStatusProp = {
    orderDatePlaced?: string;
    status?: string;
    statusHistory: OrderStatusHistoriesType[];
};

function OrderStatus({
    orderDatePlaced,
    status,
    statusHistory
}: OrderStatusProp) {

    const statuses = [
        { name: 'Order placed', icon: OrderPlaced },
        { name: 'Order confirmed', icon: OrderConfirmed },
        { name: 'Processing', icon: Processing },
        { name: 'Ready-for-pickup', icon: ReadyForPickup },
        { name: 'Completed', icon: Completed }
    ];

    const statusPassed = 'bg-[#ff6b00] text-[#fff]';
    const statusPending = 'opacity-25 bg-[#B1B2B5] text-[#292929]';

    const currentStatusIndex = statuses.findIndex(
        item => item.name === status
    );

    return (
        <div className='flex flex-col items-start w-full gap-[0.5rem]'>

            <span className='text-[14px] text-[#292929] font-bold leading-none'>
                Status
            </span>

            <div className='flex flex-col items-start w-full'>

                {statuses.map((item, index) => {

                    const Icon = item.icon;
                    const passed = index <= currentStatusIndex;

                    const history = statusHistory.find(
                        history => history.status === item.name
                    );

                    // const history = statusHistory?.filter(
                    //     item => item.status === status
                    // ).at(-1);

                    const updatedAt = history
                        ? new Date(history.updated_at).toLocaleDateString('en-PH', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })
                        : 'Pending';


                    return (
                        <div key={item.name} className='flex flex-col w-full'>

                            <div
                                className={`flex items-center gap-[0.5rem] w-full h-[3rem] p-[0.5rem] rounded-[10px]
                                    ${passed ? statusPassed : statusPending}
                                `}
                            >
                                <div className='flex items-center justify-center p-[0.1rem] bg-[#fff] rounded-full'>
                                    <Icon
                                        className='size-5'
                                        color={passed ? '#ff6b00' : '#292929'}
                                    />
                                </div>

                                <div className='flex flex-col items-start gap-[0.2rem]'>
                                    <span className='text-[12px] font-bold leading-none'>
                                        {item.name}
                                    </span>

                                    <span className='text-[12px] leading-none opacity-75'>
                                        {history?.updated_at
                                            ? formatDate(history.updated_at)
                                            : updatedAt
                                        }
                                    </span>
                                </div>
                            </div>

                            {index !== statuses.length - 1 && (
                                <div
                                    className={`ml-[1.2rem] w-[2px] h-[10px]
                                        ${index < currentStatusIndex
                                            ? 'bg-[#ff6b00]'
                                            : 'bg-[#B1B2B5]/25'
                                        }
                                    `}
                                />
                            )}

                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default OrderStatus;
