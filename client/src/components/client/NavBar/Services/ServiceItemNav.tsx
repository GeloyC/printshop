import { Link } from "react-router-dom";

import Arrow from '/src/assets/icon/arrow-with-tail.svg?react'


type ServiceNameType = {
    id: string,
    name: string,
    slug: string
}

type ServiceItemNavProp = {
    serviceName: ServiceNameType
    handleCloseDropdowns: () => void
}

function ServiceItemNav ({ serviceName, handleCloseDropdowns }: ServiceItemNavProp) {

    return (
        <Link to={`/service/${serviceName.slug}`} onClick={handleCloseDropdowns} className="flex items-center justify-start min-w-[300x] w-[300px] max-w-[400px] text-nowrap py-[0.75rem] gap-[0.2rem] hover:gap-[0.75rem] px-[0.5rem] hover:bg-[#ffdca5] active:bg-[#ffc36d] rounded-[5px] transition-all duration-200">
            <Arrow className="size-5" />
            <span className="text-[14px] text-center text-[#292929] font-bold leading-none">{serviceName.name}</span>
        </Link>
    )
}

export default ServiceItemNav;