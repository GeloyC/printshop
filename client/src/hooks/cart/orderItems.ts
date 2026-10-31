import { useQuery } from "@tanstack/react-query";
import { getAllCartItems } from "../../api/orderItem";

export function useGetCartItems (user_id: string) {

    return useQuery({
        queryKey: ['cart-items', user_id],
        queryFn: async () => {
            return await getAllCartItems(user_id)
        }
    });
}