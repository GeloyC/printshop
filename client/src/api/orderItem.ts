import api from "./api";

export async function AddItemToCart (formData: FormData, user_id: string) {
    const response = await api.post(`/api/order/add-to-cart/${user_id}`, formData);
    return response.data;
}


export async function getAllCartItems (user_id: string) {
    const response = await api.get(`/api/order/cart/${user_id}`);
    return response.data;
}