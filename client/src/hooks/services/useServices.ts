import { useQuery } from "@tanstack/react-query";
import { getAllService, getServiceConfiguration } from "../../api/service";

export const useServices = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: getAllService
    });
}


export const useServiceConfiguration = (slug: string) => {
    return useQuery({
        queryKey: ['service-config', slug],
        queryFn: async () => {
            return await getServiceConfiguration(slug);
        }
    });
}