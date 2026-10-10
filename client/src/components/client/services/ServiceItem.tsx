import { Link } from "react-router-dom";
import type { ServiceItemType } from "../../../types/service/service";

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
        <Link to={`/service/${service.slug}`} className={`group relative grid grid-rows-[auto_auto] w-full h-[250px] rounded-[8px] bg-[#ffc36d]/0 hover:bg-[#ffdca5] p-[0.5rem] transition-all duration-200`}>
            <div className="flex w-full h-[200px] bg-[#f2f2f2] rounded-[5px] overflow-hidden">
                <img src="/samples-deletelater/985797580.png" alt="" className="w-full h-full"/>
            </div>

            <div className="flex flex-col justify-center w-full h-full py-[0.5rem]">
                <span className="text-[18px] text-[#292929] text-wrap font-bold transition-all duration-100">{service.name}</span>
            </div>
        </Link>
    )
}


export default ServiceItem