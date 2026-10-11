import { useQuery } from "@tanstack/react-query";
import { getAllService } from "../../api/service";

export const useServices = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: getAllService
    });
}