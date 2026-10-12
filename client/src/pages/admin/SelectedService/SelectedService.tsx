import { useParams } from "react-router-dom";

// component
import SelectedServiceForm from "./SelectedServiceForm";

// service

import { useAdminSelectedService } from "../../../hooks/services/useSelectedService";

function SelectedService () {

    const { slug } = useParams();
    const { data: service, isPending } = useAdminSelectedService(String(slug))


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