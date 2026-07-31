import axios from "axios";
import { config } from "../config/env";

const axiosInstance = axios.create({
    baseURL: config.apiUrl,
    timeout: 10000,
});

axiosInstance.interceptors.request.use((req) => {
    try {
        const data = JSON.parse(localStorage.getItem("appState"));
        const token = data?.auth?.token;

        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
    } catch {
        // Ignore error and proceed without auth token
    }

    return req;
});

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("appState");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;