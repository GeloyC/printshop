import api from "./api";

export async function AddItemToCart (formData: FormData, user_id: string) {
    const response = await api.post(`/api/order/add-to-cart/${user_id}`, formData);
    return response.data;
}