import { useState } from 'react';
import axios from 'axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getOrdersByStatus, getOrderPlacedCount, getOrdersAdmin, getOrderDetail, updateOrderStatus, downloadOrderItemFile, uploadReadyForPickUpImageProof } from '../../api/order.api';
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
        enabled: !!user
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
            queryClient.invalidateQueries({ queryKey: ['order-detail', reference_number] }),
            queryClient.invalidateQueries({ queryKey: ['orders-admin'] }),
        ]),
    });
}

export function useUploadReadyForPickUpImageProof (reference_number: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            await uploadReadyForPickUpImageProof(reference_number, formData)
        },
        onSuccess: ()=> {
            queryClient.invalidateQueries({ queryKey: ['order-detail', reference_number] });
        }, onError: (err: unknown) => {
            if (axios.isAxiosError(err)) {
                console.error('Message:', err.message);
                console.error('Status:', err.response?.status);
                console.error('Response:', err.response?.data);
                console.error('Request:', err.request);
            } else {
                console.error(err);
            }
        }
    });
}


export function useDownloadOrderFileItem () {
    return useMutation({
        mutationFn: (id: string) => downloadOrderItemFile(id)
    })
}