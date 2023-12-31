import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL,
    headers: {
        'Authorization': 'Bearer ' + import.meta.env.VITE_API_TOKEN,
    }
})

export default api;