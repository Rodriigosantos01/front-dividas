import axios from 'axios';

const token = sessionStorage.getItem('token');
var API = axios.create({
    baseURL: 'https://api-dividas.herokuapp.com/',
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export { API }