

import { Link } from 'react-router-dom';
import type { ServiceItemType } from '../../../types/service/service.type';
import { ThumbnailUrl } from '../../../utils/cloudflarePublicURL';
import currencyFormat from '../../../utils/currencyFormat';

type ServiceItemProp = {
    service: ServiceItemType
}

function ServiceItem ({
    service
}: ServiceItemProp) {

    return (
        <Link to={`/admin/service/${service.slug}`} className='group flex flex-col gap-[0.5rem] h-[300px] p-[0.5rem] bg-[#fafafa] hover:border-[#ffc36d] hover:bg-[#fff0d3] rounded-[10px] w-full border border-[#292929]/20 cursor-pointer transition-all duration-200'>

            <div className='flex items-center justify-center bg-[#fff0d3] overflow-hidden rounded-[5px]'>
                <img src={`${ThumbnailUrl}${service.thumbnail_url}`} alt="" className='object-cover w-full h-full'/>
            </div>
            <div className='flex flex-col w-full px-[0.2rem]'>
                <span className='group-hover:underline group-active:text-[#292929]/75 text-[16px] text-[#292929] font-bold'>{service?.name}</span>
                <span className='text-[14px] text-[#292929]/50'>Created on {(service.created_at)}</span>
                <span className='text-[16px] text-[#292929] font-bold'>{currencyFormat(Number(service.base_price))}</span>
            </div>
        </Link>
    )
}

export default ServiceItem