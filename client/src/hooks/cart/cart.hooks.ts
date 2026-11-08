import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { getCartItemCount } from "../../api/cart_item.api";
import { AddItemToCart } from "../../api/order_item.api";

import type { fileItem } from "../../types/file.type";
import type { UserType } from "../../types/user.type";



export function useAddToCart (
    user: UserType, 
    formData: FormData, 
    files: fileItem[],
    proceedToCheckOut: ()=>void,
    handleOpenLogin: ()=>void

) {
    const queryClient = useQueryClient();

    return useMutation<any[], Error, void>({
        mutationFn: async () => {
            if (!user) {
                throw new Error('UNAUTHENTICATED');
            }

            const responses = [];

            for (const file of files) {
                formData.append('configuration', JSON.stringify(file.configuration));
                formData.append('file', file.file);

                if (file.additional_instruction) {
                    formData.append('additional_instruction', file.additional_instruction);
                }
                
                formData.append('slug', file.slug);
                formData.append('service_slug', file.slug);
                formData.append('quantity', String(file.quantity));
                formData.append('unit_price', String(file.unit_price));
                formData.append('total_price', String(file.total_price));

                responses.push(await AddItemToCart(formData, user.id));
            }

            return responses;
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey:['cart-items', user?.id] }),
                queryClient.invalidateQueries({ queryKey:['cart', user?.id] }),
                proceedToCheckOut()
            ])

        },
        onError: (err: unknown) => {

            if (err instanceof Error && err.message === 'UNAUTHENTICATED') {
                handleOpenLogin();
                return;
            }

            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    console.log('Error: ', err.response?.status);
                    handleOpenLogin();
                    return;
                }
                
                console.error('Status:', err.response?.status);
                console.error('Response:', err.response?.data);
            } else {
                console.error('Unexpected error:', err);
            }

        }
    });
}



export function useGetCartItemCount (user_id?: string) {

    return useQuery({
        queryKey: ['cart', user_id],
        queryFn: getCartItemCount,
        enabled: !!user_id
    });
}


