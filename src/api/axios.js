import axios from 'axios';

export default axios.create({
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'https://buyit.up.railway.app/',
    // baseURL: 'http://localhost:3500/',
});

const axiosPrivate = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'https://buyit.up.railway.app/',
    // baseURL: 'http://localhost:3500/',
});

export { axiosPrivate };
