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
        <Link to={`/service/${serviceName.slug}`} className="flex justify-center w-full text-nowrap py-[0.5rem] px-[1rem] hover:bg-[#B1B2B5]/25 active:bg-[#B1B2B5]/35 rounded-[5px]">{serviceName.name}</Link>
    )
}

export default ServiceItemNav;