import api, { setAccessToken } from './axiosInstance';

const API_URL = "/credenciales/";

export const doLogin = async (usuario, password) => {
    try {
        const response = await api.post(API_URL + "login/", {
            username: usuario,
            password: password
        });
        // if server returned access, set it on the shared axios instance
        if (response?.data?.access) {
            setAccessToken(response.data.access);
        }
        return response.data;
    } catch (error) {
        console.error("Error en doLogin:", error.response?.data || error.message);
        return null;
    }
};

export const chechSession = async () => {
    try {
        const response = await api.get(API_URL + "check-auth/");
        return response.data.authenticated;
    } catch (error) {
        return false;
    }
};

export const checkRol = async () => {
    try {
        const response = await api.get(API_URL + "rol/");
        return response.data;
    } catch (error) {
        return error;
    }
}
export const logOut = async () => {
    try {
        const response = await api.post(API_URL + "logout/");
        return response.data;
    } catch (error) {
        return error;
    }
}