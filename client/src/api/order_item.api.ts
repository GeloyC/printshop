import api from "./api";

import type { fileConfigType, Metadata, SelectedOption, UpdatedConfigPayload } from "../types/file.type";

interface CartItem {
    id: string,
    file: File,
    metadata?: Metadata,
    quantity: number,
    slug: string,
    configuration?: SelectedOption[],
    additional_instruction?: string,
    unit_price?: number,
    total_price?: number
}

export async function AddItemToCart (formData: FormData, user_id: string) {
    const response = await api.post(`/api/order/add-to-cart/${user_id}`, formData);
    return response.data;
}


export async function getAllCartItems (user_id: string) {
    const response = await api.get(`/api/order/cart/${user_id}`);
    return response.data;
}

export async function addItemQuantity (item_id: string): Promise<CartItem> {
    const response = await api.patch(`/api/order/cart/item/${item_id}/add`);
    return response.data;
}

export async function subtractItemQuantity (item_id: string): Promise<CartItem> {
    const response = await api.patch(`/api/order/cart/item/${item_id}/subtract`);
    return response.data;
}


export async function deleteCartItem (item_id: string) {
    const response = await api.delete(`/api/order/cart/item/${item_id}/delete`);
    return response.data;
}



export async function updateCartItemConfiguration (
    item_id: string, 
    payload: Partial<UpdatedConfigPayload>
) {
    const response = await api.patch(`/api/order/cart/item/${item_id}/configuration`, 
        payload
    );
    return response.data;
}