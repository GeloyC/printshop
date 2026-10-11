import { useQuery } from "@tanstack/react-query";
import { getServiceNames } from "../../api/service";

export const useServiceNames = () => {
    return useQuery({
        queryKey: ['service-names'],
        queryFn: getServiceNames
    });
}