import { useQuery } from "@tanstack/react-query";
import { 
    getClientServiceBySlug, 
    getAdminServiceBySlug 
} from "../../api/service";


export const useClientSelectedService = (slug: string) => {
    
    return useQuery({
        queryKey: ['client-selected-service', slug],
        queryFn: async () => {
            return await getClientServiceBySlug(slug!);
        },
        enabled: !!slug,
        retry: false
    });
}


export const useAdminSelectedService = (slug: string) => {
    return useQuery({
        queryKey: ['admin-selected-service', slug],
        queryFn: async () => {
            return await getAdminServiceBySlug(slug!);
        }, 
        enabled: !!slug,
        retry: false
    }); 
}