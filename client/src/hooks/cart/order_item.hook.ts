import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addItemQuantity, deleteCartItem, getAllCartItems, subtractItemQuantity, updateCartItemConfiguration } from "../../api/order_item.api";
import axios from "axios";
import type { UpdatedConfigPayload } from "../../types/file.type";



export function useGetCartItems (user_id?: string) {

    return useQuery({
        queryKey: ['cart-items', user_id],
        queryFn: getAllCartItems,
        enabled: !!user_id
    });
}


export function useAddCartItemQuantity (item_id: string, user_id?: string) {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: () => addItemQuantity(item_id),
        onSuccess: async () => {
            console.log('Mutation successful');
            
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['cart-items', user_id] }),
                queryClient.invalidateQueries({ queryKey: ['cart', user_id] })
            ])
        },
        onError: (err: unknown) => {
            if (axios.isAxiosError(err)) {
                console.error('Status:', err.response?.status);
                console.error('Response:', err.response?.data);
            } else {
                console.error('Unexpected error:', err);
            }
        }
    });
}


export function useSubtractCartItemQuantity (item_id: string, user_id?: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => subtractItemQuantity(item_id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart-items', user_id] }),
        onError: (err: unknown) => {
            if (axios.isAxiosError(err)) {
                console.error('Status:', err.response?.status);
                console.error('Response:', err.response?.data);
            } else {
                console.error('Unexpected error:', err);
            }
        }
    });
}

export function useDeleteCartItem (item_id: string,  user_id?: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteCartItem(item_id),
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: ['cart-items', user_id] }),
            queryClient.invalidateQueries({ queryKey: ['cart', user_id] }),
        ]),
            
        onError: (err: unknown) => {
            if (axios.isAxiosError(err)) {
                console.error('Status:', err.response?.status);
                console.error('Response:', err.response?.data);
            } else {
                console.error('Unexpected error:', err);
            }
        }
    });
}



export function useUpdateCartItemConfiguration (item_id: string,user_id?: string ) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            payload: Partial<UpdatedConfigPayload>
        ) => {
            try {
                return await updateCartItemConfiguration(
                    item_id, 
                    payload
                );
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    console.error('Status:', err.response?.status);
                    console.error('Response:', err.response?.data);
                } else {
                    console.error('Unexpected error: ', err);
                }
            }
        },
        onSuccess: ()=> Promise.all([
            queryClient.invalidateQueries({ queryKey:['cart-items', user_id] }),
            queryClient.invalidateQueries({ queryKey:['cart', user_id] })

        ]),
        onError: (err:unknown) => {
            if (axios.isAxiosError(err)) {
                console.error('Status:', err.response?.status);
                console.error('Response:', err.response?.data);
            } else {
                console.error('Unexpected error: ', err);
            }
        }
    });
}