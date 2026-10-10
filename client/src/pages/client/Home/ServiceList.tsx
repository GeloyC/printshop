import ServiceItem from "../../../components/client/services/ServiceItem"
import type { ServiceItemType } from "../../../types/service/service"




type ServiceListProp = {
    services: ServiceItemType[]
}

function ServiceList ({ services }: ServiceListProp) {

    console.log(services);

    return (
        <div className="grid grid-cols-4 w-full py-[2rem]">
            {services.map(service => (
                <ServiceItem 
                    service={service}
                />
            ))}
        </div>
    )
}


export default ServiceList