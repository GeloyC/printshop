import api from "./api";


export const createService = async (data: FormData) => {
    const response = await api.post('/api/service/new', data);
    return response.data;
}

export const getAllService = async () => {
    const response = await api.get('/api/services');
    return response.data ?? [];
}

export const getAdminServiceBySlug = async (slug: string) => {
    const response = await api.get(`/api/admin/service/${slug}`);
    return response.data;
}

export const getClientServiceBySlug = async (slug: string) => {
    const response = await api.get(`/api/client/service/${slug}`);
    return response.data; 
}

export const getServiceNames = async () => {
    const response = await api.get('/api/services/names');
    return response.data ?? [];
}

export const updateService = async (formData: FormData, id: string) => {
    const response = await api.patch(`/api/service/${id}`, formData);
    return response.data;
}

export const deleteService = async (id: string) => {
    const response = await api.delete(`/api/service/${id}`);
    return response.data;
}


export const getServiceConfiguration = async (slug: string) => {
    const response = await api.get(`/api/service/${slug}/configuration`);
    return response.data;
}