import { Link } from "react-router-dom";
import type { ServiceItemType } from "../../../types/service/service.type";
import { cloudflare_url } from "../../../utils/cloudflarePublicURL";

// icon
import ArrowDiagonal from '/src/assets/icon/arrow-diagonal.svg?react'


/*
* Service Item requirements
* 1. title
* 2. Thumbnail
* 3. service name slug ex. 'Document Print' turns to document_print 
*/

type ServiceItemProp = {
    service: ServiceItemType
}
function ServiceItem ({ service }: ServiceItemProp) {

    return (
        <Link to={`/service/${service.slug}`} className={`group relative flex flex-col min-w-0 w-full h-[400px] gap-[0.5rem] rounded-[15px] transition-all duration-200`}>

            <div className='absolute top-3 right-3 z-10 rounded-full bg-[#ff6b00] opacity-0 group-hover:opacity-100 transition-all duration-200'>
                <ArrowDiagonal className={'size-7'} color="#FFF"/>
            </div>

            <div className="flex w-full h-[275px] bg-[#fff] group-hover:rotate-1 rounded-[10px] overflow-hidden transition-all duration-200">
                <img src={`${cloudflare_url}${service?.thumbnail_url}`} alt="" className="object-cover w-full h-full transition-all duration-300"/>
            </div>

            <span className="text-[18px] text-[#292929] text-wrap font-bold leading-none transition-all duration-100">{service.name}</span>

            <span className="text-sm text-[#292929] leading-none opacity-75">{service.description}</span>
        </Link>
    )
}


export default ServiceItem