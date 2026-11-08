
// icons
import Completed from '/src/assets/icon/box-with-check.svg?react'
import ReadyForPickup from '/src/assets/icon/document-success.svg?react'
import ToPrint from '/src/assets/icon/print.svg?react'
import OrderConfirmed from '/src/assets/icon/save-check.svg?react'
import OrderPlaced from '/src/assets/icon/check.svg?react'
import { formatDate } from '../../../utils/formatDate'


type OrderStatusProp = {
    status?: string,
    current_status?: string,
    updated_at?: string
}

function OrderStatus ({
    status,
    current_status,
    updated_at
}: OrderStatusProp) {

    const statuses = [
        'Order placed',
        'Order confirmed',
        'Printing started',
        'Ready-for-pickup',
        'Completed'
    ];

    const statusPassed = 'bg-[#ff6b00] text-[#fff]';
    const statusPending = 'opacity-25 bg-[#B1B2B5] text-[#292929]';

    const currentStatusIndex = statuses.indexOf(String(current_status));

    const isPassed = (status: string) => {
        return statuses.indexOf(status) <= currentStatusIndex;
    };

    return (
        <div className='flex flex-col items-start w-full gap-[0.5rem]'>
            <span className='text-[14px] text-[#292929] font-bold leading-none'>Status</span>

            <div className='flex flex-col items-start w-full'>
                <div 
                    className={`flex flex-1 items-center justify-start gap-[0.5rem] w-full h-[3rem] p-[0.5rem] rounded-[10px]
                        ${isPassed('Order placed')
                            ? statusPassed
                            : statusPending
                        }
                    `}
                >
                    <div className='flex items-center justify-center p-[0.1rem] bg-[#fff] rounded-full'>
                        <OrderPlaced className='size-5' color={`${isPassed('Order placed') ? '#ff6b00' : '#292929'}`} />
                    </div>
                    <div className='flex flex-col items-start gap-[0.2rem]'>
                        <span className={`text-[12px] font-bold leading-none`}>Order placed</span>
                        <span className='text-[12px] leading-none opacity-75'>
                            {isPassed('Order place') && formatDate(String(updated_at))}
                        </span>
                    </div>
                </div>

                <div className={`ml-[1.2rem] w-[2px] h-[10px] ${isPassed('Order confirmed') ? 'bg-[#ff6b00]' : 'bg-[#B1B2B5]/25'}`} />

                <div 
                    className={`flex flex-1 items-center justify-start gap-[0.5rem] w-full h-[3rem] p-[0.5rem] rounded-[10px]
                        ${isPassed('Order confirmed')
                            ? statusPassed
                            : statusPending
                        }
                    `}
                >
                    <div className='flex items-center justify-center p-[0.1rem] bg-[#fff] rounded-full'>
                        <OrderConfirmed className='size-5' color={`${isPassed('Order confirmed') ? '#ff6b00' : '#292929'}`} />
                    </div>
                    <div className='flex flex-col items-start gap-[0.2rem]'>
                        <span className={`text-[12px] font-bold leading-none`}>Order confirmed</span>
                        <span className='text-[12px] leading-none opacity-75'>
                            {isPassed('Order confirmed') && formatDate(String(updated_at))}
                        </span>
                    </div>
                </div>

                <div className={`ml-[1.2rem] w-[2px] h-[10px] ${isPassed('Printing started') ? 'bg-[#ff6b00]' : 'bg-[#B1B2B5]/25'}`} />

                <div 
                    className={`flex flex-1 items-center justify-start gap-[0.5rem] w-full h-[3rem] p-[0.5rem] rounded-[10px]
                        ${isPassed('Printing started')
                            ? statusPassed
                            : statusPending
                        }
                    `}
                >
                    <div className='flex items-center justify-center p-[0.1rem] bg-[#fff] rounded-full'>
                        <ToPrint className='size-5' color={`${isPassed('Printing started') ? '#ff6b00' : '#292929'}`} />
                    </div>
                    <div className='flex flex-col items-start gap-[0.2rem]'>
                        <span className={`text-[12px] text-[#292929] font-bold leading-none`}>Printing started</span>
                        <span className='text-[12px] leading-none opacity-75'>
                            {isPassed('Printing started') && formatDate(String(updated_at))}
                        </span>
                    </div>
                </div>

                <div className={`ml-[1.2rem] w-[2px] h-[10px] ${isPassed('Ready-for-pickup') ? 'bg-[#ff6b00]' : 'bg-[#B1B2B5]/25'}`} />

                <div 
                    className={`flex flex-1 items-center justify-start gap-[0.5rem] w-full h-[3rem] p-[0.5rem] rounded-[10px]
                        ${isPassed('Ready-for-pickup')
                            ? statusPassed
                            : statusPending
                        }
                    `}
                >
                    <div className='flex items-center justify-center p-[0.1rem] bg-[#fff] rounded-full'>
                        <ReadyForPickup className='size-5' color={`${isPassed('Ready-for-pickup') ? '#ff6b00' : '#292929'}`} />
                    </div>
                    <div className='flex flex-col items-start gap-[0.2rem]'>
                        <span className={`text-[12px] text-[#292929] font-bold leading-none`}>Ready-for-pickup</span>
                        <span className='text-[12px] leading-none opacity-75'>
                            {isPassed('Ready-for-pickup') && formatDate(String(updated_at))}
                        </span>
                    </div>
                </div>

                <div className={`ml-[1.2rem] w-[2px] h-[10px] ${isPassed('Completed') ? 'bg-[#ff6b00]' : 'bg-[#B1B2B5]/25'}`} />

                <div 
                    className={`flex flex-1 items-center justify-start gap-[0.5rem] w-full h-[3rem] p-[0.5rem] rounded-[10px]
                        ${isPassed('Completed')
                            ? statusPassed
                            : statusPending
                        }
                    `}
                >
                    <div className='flex items-center justify-center p-[0.1rem] bg-[#fff] rounded-full'>
                        <Completed className='size-5' color={`${isPassed('Completed') ? '#ff6b00' : '#292929'}`} />
                    </div>
                    <div className='flex flex-col items-start gap-[0.2rem]'>
                        <span className={`text-[12px] text-[#292929] font-bold leading-none`}>Completed</span>
                        <span className='text-[12px] leading-none opacity-75'>
                            {isPassed('Completed') && formatDate(String(updated_at))}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderStatus;