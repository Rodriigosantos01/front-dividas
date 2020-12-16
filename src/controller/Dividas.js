import { API } from '../server/';
const BASEURL = `dividas`;

const getAllDividas = async () => {
    const res = await API.get(`${BASEURL}`)
        .then(res => {
            return res.data;
        }).catch(function (error) {
            return [];
        })
    return res;
}

const createDivida = async (divida) => {

    const res = await API.post(`${BASEURL}`, divida)
        .then(res => {
            return res;
        }).catch(function (error) {
            return { error };
        })

    return res;
}

const updateDivida = async (id, divida) => {
    const res = await API.put(`${BASEURL}/${id}`, divida)
        .then(res => {
            return res;
        }).catch(function (error) {
            return { error };
        })

    return res;
}

const deleteDivida = async (id) => {
    const res = await API.delete(`${BASEURL}/${id}`)
        .then(res => {
            return res;
        }).catch(function (error) {
            return { error };
        })

    return res;
}

export { getAllDividas, createDivida, updateDivida, deleteDivida };