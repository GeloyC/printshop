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



// Admin api calls

export async function getOrdersAdmin () {
    const response = await api.get('/api/admin/order/list');
    return response.data;
}

export async function getOrderDetail (reference_number: string) {
    const response = await api.get(`/api/admin/order/${reference_number}`);
    return response.data;
}

type updateOrderStatusParams = {
    reference_number: string,
    status: string
}

export async function updateOrderStatus (params: updateOrderStatusParams) {
    const response = await api.patch('/api/admin/order/status', params);
    return response.data;
}

export async function downloadOrderItemFile (id: string) {
    const response = await api.get(`/api/admin/order/${id}/file-download`, {
        responseType: 'blob'
    });

    const contentType = response.headers['content-type'];
    const blob = new Blob([response.data], {
        type: typeof contentType === 'string' ? contentType : ''
    });

    const contentDisposition = response.headers['content-disposition'];
    const filename = contentDisposition
        ?.split('filename=')[1]
        ?.replace(/"/g, '') ?? 'download';

    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = downloadUrl;
    link.download = filename;

    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(downloadUrl);
}