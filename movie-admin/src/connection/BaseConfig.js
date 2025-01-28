import {BASE_URL} from "./BaseUrl.js";
import axios from "axios";

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
    }
};
const configUpload = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
    }
}


export const BASE_CONFIG = {
    doGet: (api) => axios.get(`${BASE_URL}${api}`, config),
    doPost: (api, data) => axios.post(`${BASE_URL}${api}`, data, config),
    doUploadFile: (api, formData) => axios.post(`${BASE_URL}${api}`, formData, configUpload),
    doPut: (api, data, id) => axios.put(`${BASE_URL}${api}/${id}`, data, config),
    doParam: (api) => axios.patch(`${BASE_URL}${api}`, config),
    doDelete: (api, id) => axios.delete(`${BASE_URL}${api}/${id}`, config),
    doDeleteSerial: (api, id) => axios.delete(`${BASE_URL}${api}${id}`, config),
    doPremyera: (api) => axios.put(`${BASE_URL}${api}`, {}, config),
    doGetOne: (url, id) => axios.get(`${BASE_URL}${url}/${id}`,config)
}


export const BASE_CONFIG_AUTH = {
    doGet: (api) => axios.get(`${BASE_URL}${api}`),
    doPost: (api, data) => axios.post(`${BASE_URL}${api}`, data),
    doPut: (api, data, id) => axios.put(`${BASE_URL}${api}/${id}`, data, config),
    doDelete: (api, id) => axios.delete(`${BASE_URL}${api}/${id}`, config)
}