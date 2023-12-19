import axios from "axios";

export const getAxios = async (url) => {
    const resp = await axios.get(url);
    return resp;
};

export const postAxios = async (url, data) => {
    const resp = await axios.post(url, data);
    return resp;
};

export const putAxios = async (url, data) => {
    const resp = await axios.put(url, data);
    return resp;
};

export const deleteAxios = async (url, data) => {
    const resp = await axios.delete(url);
    return resp;
};