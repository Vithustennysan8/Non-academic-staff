import axios from "axios";
import { handleError } from "../utils/errorHandler";
import { isTokenExpired, clearAuthData } from "../utils/tokenUtils";

export const Axios = axios.create({
    baseURL: "http://10.15.136.83:8080/api/v1",
    // baseURL: "http://localhost:8080/api/v1",
})

Axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        // Check if token is expired before making request
        if (isTokenExpired(token)) {
            clearAuthData();
            // Redirect to login will be handled by the response interceptor
            return Promise.reject({
                code: "TOKEN_EXPIRED",
                message: "Your session has expired. Please login again."
            });
        }
        
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
})

Axios.interceptors.response.use(
    (response) => response, 
    (error) => {
        // Handle network errors
        if(!error.response){
            handleError({
                code: "NETWORK_ERROR",
                message: "Network Error, Please check your internet connection",
            });
            return Promise.reject({ code: "NETWORK_ERROR", message: "Network Error" });
        }

        const { status, data } = error.response;
        
        const message = data.message || "Unexpected error occurred";

        const codeMap = {
            400: "BAD_REQUEST",
            401: "UNAUTHORIZED",
            403: "FORBIDDEN",
            404: "NOT_FOUND",
            409: "CONFLICT",
            429: "TOO_MANY_REQUESTS",
            500: "INTERNAL_SERVER_ERROR",
            502: "BAD_GATEWAY",
            503: "SERVICE_UNAVAILABLE",
            504: "GATEWAY_TIMEOUT",
        };

        const code = codeMap[status] || "UNKNOWN_ERROR";

        handleError({ code, message });   
        return Promise.reject({ code, message });
    }
);
