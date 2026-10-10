import type { Configuration } from "../types/service/service";
import api from "./api";


type createServiceType = {
    name: string,
    description: string,
    base_price: number,
    thumbnail_url?: string,
    configuration: Configuration[],
    slug: string,
}
export const createService = async (data: createServiceType) => {
    const response = await api.post('/api/service/new', data);

    console.log('createService response: ', response.data);
    return response.data;
}

export const getAllService = async () => {
    const response = await api.get('/api/services');
    console.log('[getAllService]: ', response.data);

    return response.data ?? [];
}

export const getServiceBySlug = async (slug: string) => {
    const response = await api.get(`/api/service/${slug}`);

    return response.data;
}