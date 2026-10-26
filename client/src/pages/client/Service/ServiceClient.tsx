
/*
* ServiceClient component is reusable across different services
* ServiceClient component must require a urlParams 'slug' to identify which service to display
* TODO: create helper functions that will be called according to service selected.
*/

import { useParams } from "react-router-dom";

import ServiceClientForm from "./ServiceClientForm";
import { useClientSelectedService } from "../../../hooks/services/useSelectedService";
import { useServiceConfiguration } from "../../../hooks/services/useServices";

import TopLoadingBar from "../../../components/ui/TopLoadingBar";


function ServiceClient () {

    const { slug } = useParams();
    const { data: service, isPending } = useClientSelectedService(String(slug));
    const { data: configurations = [] } = useServiceConfiguration(String(slug));


    console.log('check content of configuration from ServiceClient.tsx: ', configurations);
    
    
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
            configurations={configurations} // used to display the selections for configuration
        />
    )
}

export default ServiceClient