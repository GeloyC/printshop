
import { Link } from 'react-router-dom'

// icon
import ServiceIcon from '/src/assets/icon/service.svg?react'
import Receipt from '/src/assets/icon/receipt.svg?react'
import Document from '/src/assets/icon/document.svg?react'
import Arrow from '/src/assets/icon/arrow-diagonal.svg?react'
import PriceTag from '/src/assets/icon/price-tag.svg?react'
import Status from '/src/assets/icon/box-with-check.svg?react'


function FolderItem () {

    /*
    * Links to item page based on reference number when clicked
    * get the reference_number data from the url
    * use search_params to get the reference number
    */

    return (
        <Link to="/" className="group grid grid-cols-[15%_15%_20%_20%_10%_20%] w-full max-h-[150px] py-[0.5rem] border-b border-dashed border-[#292929]/15 bg-[#fff] hover:bg-[#fff8ec] active:bg-[#fff0d3] transition-all duration-200">

            <div className="flex items-center justify-center w-full max-h-[100px] px-[0.5rem]">
                <img src="/samples-deletelater/985797580.png" alt="service_thumbnail" className="w-full h-full object-cover rounded-[5px]" />
            </div>
            
            <div className="flex flex-col w-full items-start justify-end gap-[0.3rem] px-[1rem] pt-[0.5rem] gap-[0.3rem]">
                <div className='flex items-end gap-[0.3rem]'>
                    <Receipt className="size-4 opacity-50" color='#292929' />
                    <span className="text-[12px] text-[#292929] font-bold opacity-50">Reference number</span>
                </div>

                <div className='flex flex-col w-full'>
                    <span className="text-[16px] text-[#ff6b00] font-bold leading-none">123ABC456DEF</span>
                    <span className="text-[14px] text-[#292929] font-bold leading-none opacity-50">9/29/2026 11:56 PM</span>
                </div>
            </div>

            <div className="flex flex-col w-full justify-end gap-[0.3rem] px-[0.5rem] pt-[0.5rem]">
                <div className='flex items-center gap-[0.3rem]'>
                    <ServiceIcon className="size-4 opacity-50" color='#292929' />
                    <span className="text-[12px] text-[#292929] font-bold opacity-50">Service</span>
                </div>
                <span className="text-[16px] text-[#292929] font-bold leading-none">Document Print</span>
            </div>

            <div className="flex flex-col w-full justify-end gap-[0.3rem] px-[0.5rem] pt-[0.5rem]">
                <div className='flex items-center gap-[0.3rem]'>
                    <Document className="size-4 opacity-50" color='#292929' />
                    <span className="text-[12px] text-[#292929] font-bold opacity-50">No. of files printed</span>
                </div>
                <span className="text-[16px] text-[#292929] font-bold leading-none">4 file/s</span>
            </div>

            <div className="flex flex-col w-full justify-end gap-[0.3rem] px-[0.5rem] pt-[0.5rem]">
                <div className='flex items-center gap-[0.3rem]'>
                    <PriceTag className="size-4 opacity-50" color='#292929' />
                    <span className="text-[12px] text-[#292929] font-bold opacity-50">Price</span>
                </div>
                <span className="text-[16px] text-[#292929] font-bold leading-none">Php 20.00</span>
            </div>

            <div className="flex flex-col w-full items-end justify-between px-[0.5rem] gap-[0.3rem]">
                <Arrow className='size-6 opacity-0 group-hover:opacity-100 translate-y-2 -translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200' color='#ff6b00' />

                <div className='flex flex-col w-full items-end'>
                    <div className='flex items-center gap-[0.3rem]'>
                        <Status className='size-5 opacity-50' />
                        <span className='text-[12px] text-[#292929]/50 font-bold'>Status</span>
                    </div>
                    <span className="text-[16px] text-[#32CD32] font-bold">Completed</span>
                    <span className="text-[14px] text-[#292929] font-bold leading-none opacity-50">9/29/2026 11:56 PM</span>
                </div>
            </div>
        </Link>
    )
}

export default FolderItem;