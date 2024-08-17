import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";

export const Axios = axios.create({
    baseURL: "http://localhost:8080/api",
})

Axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
})