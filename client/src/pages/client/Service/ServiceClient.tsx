
/*
* ServiceClient component is reusable across different services
* ServiceClient component must require a urlParams 'slug' to identify which service to display
* TODO: create helper functions that will be called according to service selected.
*/
import { useState } from "react";
import { useParams } from "react-router-dom";

import ServiceClientForm from "./ServiceClientForm";
import { useClientSelectedService } from "../../../hooks/services/selected_service.hook";
import { useServiceConfiguration } from "../../../hooks/services/useServices";

import TopLoadingBar from "../../../components/ui/TopLoadingBar";


function ServiceClient () {

    const { slug } = useParams();
    const { data: service, isPending } = useClientSelectedService(String(slug));
    const { data: configurations = [] } = useServiceConfiguration(String(slug));

    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [signUpOpen, setSignUpOpen] = useState<boolean>(false);

    
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
        <>
            <ServiceClientForm  
                service={service} 
                configurations={configurations} // used to display the selections for configuration
            />
        </>
    )
}

export default ServiceClient