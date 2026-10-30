import ServiceItemNav from "./ServiceItemNav";

import Close from '/src/assets/icon/add.svg?react';

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
        <div className="fade-up absolute top-0 left-1/2 -translate-x-1/2 p-[0.5rem] 
            flex min-w-0 max-w-[800px] rounded-[10px]">
            
            <div className="relative flex flex-col items-center bg-[#fff0d3] gap-[1rem] p-[1rem] rounded-[10px] border border-[#ff6b00]">
                <div className="flex items-center justify-between w-full">
                    <span className="text-[14px] text-[#ff6b00] font-bold leading-none">PICK A SERVICE</span>

                    <button onClick={handleCloseDropdowns} className="absolute top-2 right-2 flex items-center gap-[0.2rem] p-[0.2rem] px-[0.5rem] rounded-full hover:bg-[#ffc36d] active:bg-transparent cursor-pointer">
                        <span className="text-[14px] font-bold leading-none">close</span>
                        <Close className="size-5 rotate-45" />
                    </button>
                </div>

                {serviceNames.map(serviceName => (
                    <ServiceItemNav key={serviceName.id}
                        serviceName={serviceName}
                        handleCloseDropdowns={handleCloseDropdowns}
                    />
                ))}
            </div>
        </div>
    )
}

export default ServiceContainer;