import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// component
import SelectedServiceForm from "./SelectedServiceForm";

// service
import { getServiceBySlug } from "../../../api/service";

function SelectedService () {

    const { slug } = useParams();

    const { data: service, isPending } = useQuery({
        queryKey: ['service', slug],
        queryFn: async () => {
            return await getServiceBySlug(slug!);
        }, 
        enabled: !!slug,
        retry: false
    }); 

    console.log('service: ', service);

    if (isPending) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                ...loading
            </div>
        )
    }

    return (
        <SelectedServiceForm service={service} />   
    )
}

export default SelectedService;