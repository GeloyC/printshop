
import { useLocation } from 'react-router-dom';

// icon
import BoxCheck from '/src/assets/icon/box-with-check.svg?react'
import Exclamation from '/src/assets/icon/exclamation-mark.svg?react'
import currencyFormat from '../../../utils/currencyFormat';
import type { fileItem } from '../../../types/FileType';


// Retrieve the order items from the server and display all the files included on the order


function OrderConfirmation () {

    const location = useLocation();
    const ADDRESS = 'The Raket Print, Blk 9, Lot 13 Ilang-ilang St, Pembo, Taguig City, Metro Manila'

    const { orders } = location.state || {};

    const totalAmountToPay = orders.reduce((acc: any, file: fileItem) =>
        acc + file.total_price, 0
    );

    return (
        <div className='fade-up flex flex-1 flex-col items-center w-full h-full'>

            <div className="flex items-stretch w-[800px] pt-[2rem]">

                <div className="flex flex-col items-center justify-start min-h-full gap-[2rem] p-[1rem] px-[2rem] bg-[#fff0d3] border-2 border-dashed border-[#ffc36d] rounded-t-[15px]">
                    <div className="flex flex-col items-center justify-center gap-[1rem] w-full">
                        <div className="flex flex-col items-center gap-[0.3rem]">
                            <BoxCheck className="size-20 opacity-75 bg-[#fff0d3] rounded-full p-[0.3rem]" />
                            <span className="text-[36px] text-[#292929] font-bold leading-none">Thank you!</span>
                        </div>
                        <span className="text-[#292929] text-center">We've received your order and we'll let you know when it's ready for pickup.</span>
                    </div>

                    <div className="flex flex-col items-center w-full h-auto pt-[1rem] bg-[#ffdca5] rounded-[15px]">
                        <span className="w-full text-[20px] text-[#292929] px-[1rem] text-center font-bold leading-none pb-[0.5rem]">Order details</span>

                        <div className="flex flex-col w-full gap-[0.3rem] max-h-[300px] overflow-y-auto thin-scrollbar p-[1rem]">
                            <div className="flex items-center justify-between w-full">
                                <span className="text-[14px] text-[#292929] font-bold opacity-75">Reference number</span>
                                <span className="text-[14px] text-[#ff6b00] font-bold">123ABC456DEF</span>
                            </div>

                            <div className="flex items-center justify-between w-full">
                                <span className="text-[14px] text-[#292929] font-bold opacity-75">Date ordered</span>
                                <span className="text-[14px] text-[#ff6b00] font-bold">9/26/2026, 11:49 AM</span>
                            </div>

                            <div className="flex items-center justify-between w-full">
                                <span className="text-[14px] text-[#292929] font-bold opacity-75">Total Amount to pay</span>
                                <span className="text-[14px] text-[#ff6b00] font-bold">{currencyFormat(Number(totalAmountToPay))}</span>
                            </div>

                            <div className="flex items-start justify-between w-full border-t border-dashed border-[#292929]/25 pt-[0.3rem]">
                                <span className="text-[14px] text-[#292929] font-bold opacity-75 text-nowrap">Item/s ordered</span>

                                <div className="flex flex-col items-end gap-[0.3rem]">
                                    {orders.map((order: any) => (
                                        <span key={order.id} className="text-[14px] font-bold text-right text-wrap">{order.file.name} ({order.quantity}x) - {currencyFormat(Number(order.total_price))}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='relative flex p-[1rem] bg-[#fff8ec] border-2 border-[#ff6b00]/50 rounded-[15px]'>
                        <div className='absolute -top-5 left-2 rounded-full bg-[#fff] border-2 border-[#ff6b00] p-[0.3rem]'>
                            <Exclamation className='size-5 -rotate-10' />
                        </div>
                        <span className="text-[14px] text-[#292929] text-center font-bold leading-normal">When your order is ready, you may pick it up on our shop at <strong className="text-[#ff6b00]">{ADDRESS}</strong> at the convenience of your time and during our working hours. Make sure to have the copy of your reference number</span>
                    </div>

                    <div className="flex flex-col items-center justify-start w-full gap-[1rem]">
                        <span className='text-[28px] text-[#cc4c02] font-bold leading-none'>Check our shop's location here</span>
                        <div className="flex w-full h-[500px] border-2 border-[#ffc36d] rounded-[15px] overflow-hidden">
                            <iframe
                                className="w-full h-full"
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps?q=${ADDRESS}&output=embed`}
                            />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default OrderConfirmation;