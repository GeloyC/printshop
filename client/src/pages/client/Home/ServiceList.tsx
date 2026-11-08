import ServiceItem from "../../../components/client/services/ServiceItem"
import type { ServiceItemType } from "../../../types/service/service.type"




type ServiceListProp = {
    services: ServiceItemType[]
}

function ServiceList ({ services }: ServiceListProp) {

    console.log('serviceList: ', services);

    return (
        <div className="flex flex-col w-full">

            <div className="flex w-fit">
                <div className="flex items bg-[#ff6b00] rounded-t-[15px] rounded-brl[15px]">
                    <div className="bg-[#fff8ec] rounded-br-[25px] h-[2.5rem] w-[2.5rem]"/>
                </div>
                
                <span className="grow px-[2rem] pt-[0.5rem] bg-[#ff6b00] rounded-t-[20px] text-xl text-[#fff] font-[1000]">Our Services</span>

                <div className="flex items bg-[#ff6b00] rounded-t-[15px] rounded-br-[15px]">
                    <div className="bg-[#fff8ec] rounded-bl-[25px] h-[2.5rem] w-[2.5rem]"/>
                </div>
            </div>

            <div className="grid grid-cols-4 w-full p-[1.5rem] gap-[0.5rem] bg-gradient-to-b from-[#ff6b00] to-transparent rounded-t-[20px]">
                {services?.map(service => (
                    <ServiceItem key={service.id}
                        service={service}
                    />
                ))}
            </div>
        </div>

    )
}


export default ServiceList