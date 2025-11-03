import axios from 'axios';

const options = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
};

export const instance = axios.create(options);
