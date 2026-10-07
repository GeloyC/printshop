
import api from "./api";

type ResigrationData = { name: string, email: string, password: string }
export const registration = async (data: ResigrationData) => {
    const response = await api.post("/api/auth/register", data);

    console.log(response.data);
    return response.data;
}

type LoginData = { email: string, password: string };
export const login = async (data: LoginData) => {
    const response = await api.post('/api/auth/login', data);
    console.log('login response: ', response.data);
    return response.data;
}

export const logout = async () => {
    const response = await api.delete('/api/auth/logout');
    console.log(response.data)

    return response.data;
}


export const getUser = async () => {
    const response = await api.get('/api/auth/me');
    return response.data.user;
}


