
import { Link } from 'react-router-dom';


// icon
import BoxCheck from '/src/assets/icon/box-with-check.svg?react'
import ArrowBack from '/src/assets/icon/arrow-no-tail.svg?react'
import Exclamation from '/src/assets/icon/exclamation-mark.svg?react'


function OrderConfirmation () {

    const ADDRESS = 'Blk 9, Lot 13 Ilang-ilang St, Pembo, Taguig City, Metro Manila'


    return (
        <div className='flex flex-col w-full h-full'>
            <div className='flex items-center justify-start gap-[0.3rem] w-full'>
                <Link to="/" className='flex items-center'>
                    <ArrowBack className="size-5" />
                    <span className='text-[16px] text-[#292929] font-bold'>Go back to Home</span>
                </Link>
            </div>

            <div className="grid grid-cols-2 w-full h-full py-[2rem]">
                <div className="flex flex-col items-center justify-start gap-[2rem] px-[2rem]">
                    <div className="flex flex-col items-center justify-center gap-[1rem] w-full">
                        <div className="flex flex-col items-center gap-[0.3rem]">
                            <BoxCheck className="size-20 opacity-75 bg-[#ffc36d] rounded-full p-[0.3rem]" />
                            <span className="text-[36px] text-[#292929] font-bold leading-none">Thank you!</span>
                        </div>
                        <span className="text-[#292929] text-center">We've received your order and we'll let you know when it's ready for pickup.</span>
                    </div>

                    <div className="flex flex-col items-center w-full h-auto pt-[1rem] bg-[#f2f2f2]/50 rounded-[5px] border-2 border-dashed border-[#B1B2B5]/50">
                        <span className="text-[16px] font-bold leading-none">Order details</span>

                        <div className="flex flex-col w-full gap-[0.3rem] max-h-[400px] overflow-y-auto thin-scrollbar p-[1rem]">
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
                                <span className="text-[14px] text-[#ff6b00] font-bold">Php 20.00</span>
                            </div>

                            <div className="flex items-start justify-between w-full border-t border-dashed border-[#292929]/25 pt-[0.3rem]">
                                <span className="text-[14px] text-[#292929] font-bold opacity-75 text-nowrap">Item/s ordered</span>

                                <div className="flex flex-col items-end gap-[0.3rem]">
                                    <span className="text-[14px] font-bold text-right text-wrap">Item 1.pdf (2x) Php 2.00</span>
                                    <span className="text-[14px] font-bold text-right text-wrap">Filename longer.pdf (2x) Php 2.00</span>
                                    <span className="text-[14px] font-bold text-right text-wrap">What if this file name is longer than expected?asdasdasda.pdf (2x) Php 2.00</span>
                                    <span className="text-[14px] font-bold text-right text-wrap">Item 1.pdf (2x) Php 2.00</span>
                                    <span className="text-[14px] font-bold text-right text-wrap">Item 1.pdf (2x) Php 2.00</span>
                                    <span className="text-[14px] font-bold text-right text-wrap">Item 1.pdf (2x) Php 2.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='relative flex p-[1rem] bg-[#fff8ec] border-2 border-[#ff6b00]/50 rounded-[5px]'>
                        <div className='absolute -top-5 left-3 rounded-full bg-[#fff] border-2 border-[#ff6b00] p-[0.3rem]'>
                            <Exclamation className='size-5 -rotate-10' />
                        </div>
                        <span className="text-[14px] text-[#292929] text-center font-bold leading-normal">When your order is ready, you may pick it up on our shop at <strong className="text-[#ff6b00]">{ADDRESS}</strong> at the convenience of your time and during our working hours. </span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full h-full gap-[1rem] px-[2rem]">
                    <span className='text-[28px] text-[#292929] font-bold'>Check our shop's location here</span>
                    <div className="flex w-full h-[500px]">
                        <iframe
                            className="w-full h-full rounded-[10px]"
                            loading="lazy"
                            allowFullScreen
                            src={`https://www.google.com/maps?q=${ADDRESS}&output=embed`}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderConfirmation;