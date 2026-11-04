import { useQuery } from "@tanstack/react-query";

import { getCartItemCount } from "../../api/cart_item.api";


export function useGetCartItemCount (user_id: string) {

    return useQuery({
        queryKey: ['cart', user_id],
        queryFn: () => getCartItemCount(),
    });
}