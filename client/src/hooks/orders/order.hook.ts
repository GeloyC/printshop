import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getOrdersByStatus, getOrderPlacedCount, getOrdersAdmin, getOrderDetail, updateOrderStatus, downloadOrderItemFile } from '../../api/order.api';
import { useGetUser } from '../useGetUser';


export function useGetOrdersByStatus (status: string) {

    return useQuery({
        queryKey: ['orders', status],
        queryFn: () => getOrdersByStatus(status)
    });
}


export function useGetOrderPlacedCount () {
    const { data: user } = useGetUser();

    return useQuery({
        queryKey: ['order-placed-count'],
        queryFn: () => getOrderPlacedCount(),
        enabled: !!user,
        retry: false
    });
}


// ------------ ADMIN API CALLES ------------- //

export function useGetOrdersAdmin () {

    return useQuery({
        queryKey: ['orders-admin'],
        queryFn: getOrdersAdmin
    });
}

export function useGetOrderDetail (reference_number: string) {

    return useQuery({
        queryKey: ['order-detail', reference_number],
        queryFn: () => getOrderDetail(reference_number)
    });
}


export function useUpdateOrderStatus (reference_number: string, status: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => {
            const params = {reference_number: reference_number, status: status};
            return updateOrderStatus(params);
        },
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: ['orders', status] }),
            queryClient.invalidateQueries({ queryKey: ['order-detail'] }),
            queryClient.invalidateQueries({ queryKey: ['orders-admin'] }),
        ]),
    });
}


export function useDownloadOrderFileItem () {
    return useMutation({
        mutationFn: (id: string) => downloadOrderItemFile(id)
    })
}