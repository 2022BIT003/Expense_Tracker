import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// Request Interceptor to add Clerk JWT to headers
axiosInstance.interceptors.request.use(
    async (config) => {
        if (window.Clerk?.session) {
            const token = await window.Clerk.session.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor to handle expired tokens
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clerk will handle redirection if session is truly invalid
            // but we can also trigger a sign-out or redirect if needed
            console.error("Unauthorized request - potential session issue");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
