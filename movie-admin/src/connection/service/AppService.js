import {BASE_CONFIG} from "../BaseConfig.js";
import toast from "react-hot-toast";
import {APP_API} from "../AppApi.js";
import App from "../../app/App.jsx";

export const AutoSaveAndUpdate = async (api, formData, id, navigate, backLink) => {
    try {
        if (id === "") {
            await BASE_CONFIG.doPost(api, formData)
            navigate(backLink)
        } else {
            await BASE_CONFIG.doPut(api, formData, id)
        }
        toast.success("Muvoffaqiyatli saqlandi")
    } catch (err) {
        toast.error('Kino nomi bir xil bolmasn')
    }
}

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

export const DeleteAuto = async (api, id, status, getAll) => {
    try {
        const res = await BASE_CONFIG.doDelete(api, id)
        if (status === 'data') {
            toast.success(res.data.message)
        } else {
            toast.success("Muvoffaqiyatli o'chirildi")
        }
        await getAll()
    } catch (err) {
        console.log('O\'chirishda xatolik qayta urinib ko\'ring')
    }
}
export const DeleteAutoParam = async (api, id, status, getAll) => {
    try {
        const res = await BASE_CONFIG.doDeleteSerial(api, id)
        if (status === 'data') {
            toast.success(res.data.message)
        } else {
            toast.success("Muvoffaqiyatli o'chirildi")
        }
        await getAll()
    } catch (err) {
        toast.error('O\'chirishda xatolik qayta urinib ko\'ring')
    }
}

export const UploadFile = async (api, img) => {
    try {
        const formData = new FormData();
        formData.append("file", img);
        const res = await BASE_CONFIG.doUploadFile(api, formData)
        console.log(res.data.message)
        return res.data;
    } catch (err) {
        console.log('Rasm yuklashda xatolik yuz berdi' + err)
    }
}
export const updatePermyera = async (id, active) => {
    try {
        await BASE_CONFIG.doPremyera(APP_API.premyeraMovie + "/" + id + "?active=" + active)
    } catch (err) {
        console.log(err);
    }
}

export const GetOneMovie = async (id) => {
    try {
        const res = await BASE_CONFIG.doGetOne(APP_API.movie, id)
        return res.data
    } catch (err) {
        console.log(err.message)
    }
}
export const AddSerial = async (id, data, setTitle, setVideo) => {
    try {
        await BASE_CONFIG.doPost(APP_API.addNewSerial + "/" + id, data)
        setTitle("")
        setVideo("")
    } catch (err) {
        console.log(err)
    }
}
