import {BASE_CONFIG} from "../BaseConfig.js";
import {APP_API} from "../AppApi.js";

export const GetAuto = async (api, status) => {
    try {
        if (status === 'data') {
            return await BASE_CONFIG.doGet(api);
        } else {
            return await BASE_CONFIG.doGet(api);
        }
    } catch (err) {
        console.log(err)
    }
}
export const GetOneMovie = async (id) => {
    try {
        const res = await BASE_CONFIG.doGetOne(APP_API.movie,id)
        return res.data
    } catch (err) {
        console.log(err.message)
    }
}

