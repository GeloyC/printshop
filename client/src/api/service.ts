import api from "./api";


type createServiceType = {
    name: string,
    description: string,
    base_price: number,
    thumbnail_url: string,
    configuration: string,
    slug: string,
}
export const createService = async (data: createServiceType) => {
    const response = await api.post('/service/new', data);

    console.log('createService response: ', response.data);
    return response.data;
}