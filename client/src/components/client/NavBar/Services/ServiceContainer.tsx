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
        <div className="fade-up absolute top-2 left-1/2 -translate-x-1/2 p-[0.5rem] flex flex-col min-w-0 bg-[#ff6b00] rounded-[15px] gap-[0.5rem]">
            
                <div className="flex items-center justify-between w-full p-[0.5rem] border-b border-[#fff]/50">
                    <span className="text-[14px] text-[#fff] font-bold leading-none">PICK A SERVICE</span>

                    <button onClick={handleCloseDropdowns} className="flex items-center gap-[0.2rem] p-[0.2rem] px-[0.5rem] rounded-full hover:bg-[#ffc36d] active:bg-transparent cursor-pointer">
                        <span className="text-[14px] font-bold leading-none">close</span>
                        <Close className="size-5 rotate-45" />
                    </button>
                </div>

                <div className="flex flex-col w-full">
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