import { Link } from "react-router-dom";

import Arrow from '/src/assets/icon/arrow-with-tail.svg?react'


type ServiceNameType = {
    id: string,
    name: string,
    slug: string
}

type ServiceItemNavProp = {
    serviceName: ServiceNameType
}

function ServiceItemNav ({ serviceName }: ServiceItemNavProp) {

    return (
        <Link to={`/service/${serviceName.slug}`} className="flex items-center justify-center min-w-0 max-w-[250px] text-nowrap py-[0.75rem] gap-[0.2rem] hover:gap-[0.75rem] px-[1rem] hover:bg-[#fff0d3] active:bg-[#ffc36d] rounded-[5px] transition-all duration-200">
            <span className="text-[14px] text-center text-[#292929] font-bold leading-none">{serviceName.name}</span>
            <Arrow className="size-5" />
        </Link>
    )
}

export default ServiceItemNav;