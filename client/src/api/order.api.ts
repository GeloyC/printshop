import api from "./api";
import type { CartItemType } from "../types/file.type";


export async function checkoutItems (items: CartItemType[]){
    const response = await api.post('/api/order/cart/checkout', {items});
    return response.data;
}


export async function getOrdersByStatus (status: string) {
    const response = await api.get('/api/order/list', {
        params: {
            status: status
        }
    });

    return response.data ?? [];
}

export async function getOrderPlacedCount () {
    const response = await api.get('/api/order/list/count');
    return response.data;
}