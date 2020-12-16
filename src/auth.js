import { API } from './server/index'

const BASEURL = "https://api-dividas.herokuapp.com/token"

export const isAutenticated = () => {

    const token = sessionStorage.getItem('token');
    if (!token)
        return false;

    const res = API.get(`${BASEURL}`)
        .then(res => {
            return true;
        }).catch((error) => {
            return false;
        })

    return res;
};