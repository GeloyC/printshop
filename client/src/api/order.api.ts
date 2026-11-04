import api from "./api";
import type { CartItemType } from "../types/file.type";




export async function checkoutItems (items: CartItemType[]){
    const response = await api.post('/api/order/cart/checkout', {items});
    return response.data;
}