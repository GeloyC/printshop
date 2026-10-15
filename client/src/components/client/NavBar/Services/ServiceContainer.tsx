import ServiceItemNav from "./ServiceItemNav";

type ServiceNamesType = {
    id: string,
    name: string,
    slug: string
}

type ServiceContainerProp = {
    handleCloseDropdowns: () => void;
    serviceNames: ServiceNamesType[]
}

function ServiceContainer ({
    handleCloseDropdowns,
    serviceNames
}: ServiceContainerProp) {

    return (
        <div onClick={handleCloseDropdowns} 
            className="fade-up absolute top-[2.5rem] left-0 p-[1rem] 
            hidden group-hover:grid grid-cols-3 shadow-lg min-w-[600px] max-[1000px] gap-[0.5rem]
            bg-[#FFF] border border-[#272727]/10 rounded-[5px]">

            {serviceNames.map(serviceName => (
                <ServiceItemNav key={serviceName.id}
                    serviceName={serviceName}
                />
            ))}
        </div>
    )
}

export default ServiceContainer;