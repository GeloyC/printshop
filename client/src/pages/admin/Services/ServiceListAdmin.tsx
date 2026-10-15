
// component
import ServiceItem from './ServiceItem';

// type
import type { ServiceItemType } from '../../../types/service/service';

type ServiceListAdminProp = {
    services: ServiceItemType[]
}

function ServiceListAdmin ({ services }: ServiceListAdminProp) {

    return (
        <div className='sticky grid grid-cols-4 w-full h-[650px] overflow-y-auto thin-scrollbar gap-[0.5rem] p-[1rem]'>
            {services.map(service=>(
                <ServiceItem key={service?.id}
                    service={service}
                />
            ))}
        </div>
    )
}

export default ServiceListAdmin