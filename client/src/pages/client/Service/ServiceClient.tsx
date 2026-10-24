
/*
* ServiceClient component is reusable across different services
* ServiceClient component must require a urlParams 'slug' to identify which service to display
* TODO: create helper functions that will be called according to service selected.
*/

import ServiceClientForm from "./ServiceClientForm";
import { useParams } from "react-router-dom";
import { useClientSelectedService } from "../../../hooks/services/useSelectedService";
import TopLoadingBar from "../../../components/ui/TopLoadingBar";


function ServiceClient () {

    const { slug } = useParams();
    const { data: service, isPending } = useClientSelectedService(String(slug));

    
    
    if (isPending) {
        return (
            <>
                <TopLoadingBar isLoading={isPending} />
                <div className="flex items-center justify-center w-full h-full">
                    ...loading
                </div>
            </>
        )
    }

    return (
        <ServiceClientForm  
            service={service} 
        />
    )
}

export default ServiceClient