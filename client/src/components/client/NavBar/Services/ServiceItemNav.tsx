import { Link } from "react-router-dom";


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
        <Link to={`/service/${serviceName.slug}`} className="flex justify-center w-full text-nowrap py-[0.75rem] px-[1rem] bg-[#fff0d3] hover:bg-[#ffdca5] active:bg-[#ffc36d] rounded-[5px]">
            <span className="text-[14px] text-[#292929] font-bold leading-none">{serviceName.name}</span>
        </Link>
    )
}

export default ServiceItemNav;