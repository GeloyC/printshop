import type { Configuration } from "../types/service/service";
import api from "./api";

type fileRequirement = {
    extension: string
}

type createServiceType = {
    name: string,
    description: string,
    base_price: number,
    file_requirements: fileRequirement[],
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

export const getAdminServiceBySlug = async (slug: string) => {
    const response = await api.get(`/api/admin/service/${slug}`);

    console.log('[getAdminServiceBySlug]: ', response.data);
    return response.data;
}

export const getClientServiceBySlug = async (slug: string) => {
    const response = await api.get(`/api/client/service/${slug}`);

    console.log('[getClientServiceBySlug]: ', response.data);
    return response.data; 
}


export const getServiceNames = async () => {
    const response = await api.get('api/services/names');
    console.log('[getServicesNames]: ', response.data);

    return response.data ?? [];
}