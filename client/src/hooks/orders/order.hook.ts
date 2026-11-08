import { useQuery } from '@tanstack/react-query';
import { getOrdersByStatus, getOrderPlacedCount } from '../../api/order.api';
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