import { Link } from "react-router-dom";
import type { ServiceItemType } from "../../../types/service/service.type";
import { ThumbnailUrl } from "../../../utils/cloudflarePublicURL";

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
        <Link to={`/service/${service.slug}`} className={`group relative flex flex-col min-w-0 w-full h-[250px] gap-[0.5rem] rounded-[15px] transition-all duration-200`}>

            <div className='absolute top-3 right-3 z-10 rounded-full bg-[#ff6b00] opacity-0 group-hover:opacity-100 transition-all duration-200'>
                <ArrowDiagonal className={'size-7'} color="#FFF"/>
            </div>

            <div className="flex w-full h-[200px] bg-[#fff] group-hover:border-[#292929] rounded-[10px] overflow-hidden">
                <img src={`${ThumbnailUrl}${service?.thumbnail_url}`} alt="" className="w-full h-full transition-all duration-300"/>
            </div>

            <span className="text-[18px] text-[#292929] text-wrap font-bold leading-none transition-all duration-100">{service.name}</span>
        </Link>
    )
}


export default ServiceItem