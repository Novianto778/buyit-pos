import axios from 'axios';

export default axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'https://buyit.up.railway.app/',
});

const axiosPrivate = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'https://buyit.up.railway.app/',
});

export { axiosPrivate };
