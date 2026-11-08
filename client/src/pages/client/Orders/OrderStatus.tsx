
// icons
import Completed from '/src/assets/icon/box-with-check.svg?react'
import ReadyForPickup from '/src/assets/icon/document-success.svg?react'
import ToPrint from '/src/assets/icon/print.svg?react'
import OrderConfirmed from '/src/assets/icon/save-check.svg?react'
import OrderPlaced from '/src/assets/icon/check.svg?react'


function OrderStatus () {

    return (
        <div className='flex flex-col items-start w-full gap-[0.5rem]'>
            <span className='text-[14px] text-[#292929] font-bold leading-none'>Order status</span>

            <div className='flex flex-col items-start w-full'>
                <div className={`flex flex-1 items-center justify-start gap-[0.5rem] w-full h-[3rem] bg-[#ff6b00] p-[0.5rem] rounded-[10px]`}>
                    <div className='flex items-center justify-center p-[0.1rem] bg-[#fff] rounded-full'>
                        <OrderPlaced className='size-5' color='#ff6b00' />
                    </div>
                    <div className='flex flex-col items-start gap-[0.2rem]'>
                        <span className={`text-[12px] text-[#fff] font-bold leading-none`}>Order placed</span>
                        <span className='text-[12px] text-[#fff] leading-none opacity-75'>10/2/2026, 8:16 PM</span>
                    </div>
                </div>

                <div className={`ml-[1.2rem] w-[2px] h-[10px] bg-gradient-to-b from-[#ff6b00] to-[#B1B2B5]/25`} />

                <div className={`flex flex-1 items-center justify-start gap-[0.5rem] w-full h-[3rem] bg-[#B1B2B5] p-[0.5rem] rounded-[10px] opacity-25`}>
                    <div className='flex items-center justify-center p-[0.1rem] bg-[#fff] rounded-full'>
                        <OrderConfirmed className='size-5' color='#292929' />
                    </div>
                    <div className='flex flex-col items-start gap-[0.2rem]'>
                        <span className={`text-[12px] text-[#292929] font-bold leading-none`}>Order confirmed</span>
                    </div>
                </div>

                <div className={`ml-[1.2rem] w-[2px] h-[10px] bg-[#B1B2B5]/25`} />

                <div className={`flex flex-1 items-center justify-start gap-[0.5rem] w-full h-[3rem] bg-[#B1B2B5] p-[0.5rem] rounded-[10px] opacity-25`}>
                    <div className='flex items-center justify-center p-[0.1rem] bg-[#fff] rounded-full'>
                        <ToPrint className='size-5' color='292929' />
                    </div>
                    <div className='flex flex-col items-start gap-[0.2rem]'>
                        <span className={`text-[12px] text-[#292929] font-bold leading-none`}>Printing started</span>
                    </div>
                </div>

                <div className={`ml-[1.2rem] w-[2px] h-[10px] bg-[#B1B2B5]/25`} />

                <div className={`flex flex-1 items-center justify-start gap-[0.5rem] w-full h-[3rem] bg-[#B1B2B5] p-[0.5rem] rounded-[10px] opacity-25`}>
                    <div className='flex items-center justify-center p-[0.1rem] bg-[#fff] rounded-full'>
                        <ReadyForPickup className='size-5' color='#292929' />
                    </div>
                    <div className='flex flex-col items-start gap-[0.2rem]'>
                        <span className={`text-[12px] text-[#292929] font-bold leading-none`}>Ready for pick-up</span>
                    </div>
                </div>

                <div className={`ml-[1.2rem] w-[2px] h-[10px] bg-[#B1B2B5]/25`} />

                <div className={`flex flex-1 items-center justify-start gap-[0.5rem] w-full h-[3rem] bg-[#B1B2B5] p-[0.5rem] rounded-[10px] opacity-25`}>
                    <div className='flex items-center justify-center p-[0.1rem] bg-[#fff] rounded-full'>
                        <Completed className='size-5' color='#292929' />
                    </div>
                    <div className='flex flex-col items-start gap-[0.2rem]'>
                        <span className={`text-[12px] text-[#292929] font-bold leading-none`}>Completed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderStatus;