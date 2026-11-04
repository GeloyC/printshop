
import api from "./api";

type ResigrationData = { name: string, email: string, password: string }
export const registration = async (data: ResigrationData) => {
    const response = await api.post("/api/auth/register", data);
    return response.data;
}

type LoginData = { email: string, password: string };
export const login = async (data: LoginData) => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
}

export const logout = async () => {
    const response = await api.delete('/api/auth/logout');
    return response.data;
}


export const getUser = async () => {
    try {
        const response = await api.get('/api/auth/me');
        return response.data.user ?? null;
    } catch (err: any) {
        if (err.response?.status === 401) {
            return null;
        }

        throw err;
    }
}


