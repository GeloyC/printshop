

import { Link } from 'react-router-dom';


function ServiceItem () {

    return (
        <Link to={'/admin/service/service_name'} className='group grid grid-rows-[5fr_2fr] h-[300px] w-full overflow-hidden cursor-pointer'>
            <div className='flex items-center justify-center bg-[#ffdca5] rounded-[5px] border border-[#fff] group-hover:border-[#ff6b00]/25'>
                image
            </div>
            <div className='flex flex-col w-full py-[0.5rem] px-[0.2rem]'>
                <span className='group-hover:underline group-active:text-[#292929]/75 text-[16px] text-[#292929] font-bold'>Service name</span>
                <span className='text-[14px] text-[#292929]/50'>Created on Aug 28, 2026</span>
                <span className='text-[16px] text-[#ff6b00] font-bold'>P10.00</span>
            </div>
        </Link>
    )
}

export default ServiceItem