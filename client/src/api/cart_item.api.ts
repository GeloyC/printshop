import api from "./api";

export async function getCartItemCount () {
    const response = await api.get('/api/cart/item-count');
    return response.data;
}