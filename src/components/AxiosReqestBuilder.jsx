import axios from "axios";

export const Axios = axios.create({
    baseURL: "http://192.168.181.83:8080/api",
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