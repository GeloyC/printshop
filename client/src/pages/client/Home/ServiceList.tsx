import ServiceItem from "../../../components/client/services/ServiceItem"


function ServiceList () {

    return (
        <div className="grid grid-cols-4 w-full py-[2rem]">
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
        </div>
    )
}


export default ServiceList