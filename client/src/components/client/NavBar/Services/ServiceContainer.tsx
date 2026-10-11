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
        <div onClick={handleCloseDropdowns} className="fade-up absolute top-[2.5rem] left-1/2 -translate-x-1/2 p-[0.5rem] hidden group-hover:flex flex flex-col items-start shadow-lg bg-[#FFF] border border-[#272727]/10 rounded-[10px]">
            {serviceNames.map(serviceName => (
                <ServiceItemNav key={serviceName.id}
                    serviceName={serviceName}
                />
            ))}
        </div>
    )
}

export default ServiceContainer;