import { API } from '../server/';
const BASEURL = `https://jsonplaceholder.typicode.com/users`;

const getAllUsers = async () => {
    const res = await API.get(`${BASEURL}`)
        .then(res => {
            return res.data;
        }).catch(function (error) {
            return { error };
        })

    return res;
}

export { getAllUsers };