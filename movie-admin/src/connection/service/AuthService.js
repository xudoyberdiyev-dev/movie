import toast from "react-hot-toast";
import {BASE_CONFIG_AUTH} from "../BaseConfig.js";
import {APP_API} from "../AppApi.js";
import {ADMIN_URLS} from "../../utils/URL.js";
import {jwtDecode} from "jwt-decode";

export const GetMe = async (navigate) => {
    const token = localStorage.getItem("token")
    if (token === null || token === undefined || token === "undefined") {
        navigate("/")
    }
    try {
        const email = jwtDecode(token);
        return await BASE_CONFIG_AUTH.doGet(APP_API.getMe + "/" + email.email)
    } catch (err) {
        navigate("/")
    }
}
export const LoginHandler = async (data, navigator) => {
    if (!data.login.trim()) {
        toast.error("Emilni kiriting")
    }

    if (!data.password.trim()) {
        toast.error("Password kiritng")
    }

    try {
        const res = await BASE_CONFIG_AUTH.doPost(APP_API.login, data);
        localStorage.setItem("token", res.data.accessToken);

        const us = await GetMe(navigator);
        if (us.data.authorities.length > 1) {
            // toast.success("Hush kelibsiz ADMIN");
            navigator(ADMIN_URLS.dashboard);
            window.location.reload();
        }
    } catch (err) {
        toast.error("Parol yoki email hato")
        console.error("Login xatoligi:", err);
    }
};
