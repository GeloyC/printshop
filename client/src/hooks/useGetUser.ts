import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/user";

export function useGetUser () {

    return useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
    });
}