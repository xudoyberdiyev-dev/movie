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
export const BASE_CONFIG = {
    doGet: (url) => axios.get(
        `${BASE_URL}${url}`,
    ),
    doPost: (url, data) => axios.post(
        `${BASE_URL}${url}`, data,
    ),
    doPut: (url, id, data) => axios.put(
        `${BASE_URL}${url}/${id}`, data,
    ),
    doDelete: (url, id) => axios.delete(
        `${BASE_URL}${url}/${id}`,
    ), doGetOne: (url, id) => axios.get(
        `${BASE_URL}${url}/${id}`,)
}

export const BASE_CONFIG_CLIENT = {
    doPost: (url, data) => axios.post(
        `${BASE_URL}${url}`, data, config
    ),

}

