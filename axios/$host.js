import axios from "axios";

export const API_URL = "http://172.20.250.9:81/api";


const $host = axios.create({
    baseURL: API_URL
});

$host.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if(!token) return config;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

$host.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const { data } = await refreshUser();
            localStorage.setItem('accessToken', data.access);
            return $host.request(originalRequest);
        } catch (error) {
            localStorage.removeItem("accessToken");
            console.error(error);
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});

export default $host;