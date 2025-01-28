// GetMe funksiyasini yaxshilash
import {jwtDecode} from "jwt-decode";
import {BASE_CONFIG} from "../BaseConfig.js";
import {APP_API} from "../AppApi.js";
import toast from "react-hot-toast";

export const GetMe = async (navigate) => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/"); // Token bo'lmasa bosh sahifaga yo'naltirish
        return;
    }
    try {
        const email = jwtDecode(token); // Tokenni decode qilish
        const user = await BASE_CONFIG.doGet(APP_API.getMe + "/" + email.email);
        return user; // Foydalanuvchi ma'lumotlarini qaytarish
    } catch (err) {
        navigate("/"); // Xato yuz bersa bosh sahifaga qaytish
    }
};

// RegisterHandler kodini optimallashtirish
export const RegisterHandler = async (data, navigate) => {
    const validations = [
        {check: data.name.trim().length === 0, message: "Ismni kiriting"},
        {check: data.surname.trim().length === 0, message: "Familyani kiriting"},
        {check: data.email.trim().length === 0, message: "Email bo'sh bo'lmasligi shart"},
        {check: !data.email.trim().endsWith("@gmail.com"), message: "Email xato ❌"},
        {check: data.password.trim().length < 8, message: "Parol 8ta belgidan iborat bo'lishi shart"}
    ];

    for (const validation of validations) {
        if (validation.check) {
            return toast.error(validation.message);
        }
    }

    try {
        const res = await BASE_CONFIG.doPost(APP_API.register, data);
        if (res.status === 200 || res.status === 201 || res.status === 204) {
            localStorage.setItem("token", res.data.accessToken);  // Tokenni olish
            toast.success("Xush kelibsiz, foydalanuvchi!");
            navigate("/cabinet");

            // Login qilish
            const loginData = {email: data.email, password: data.password};
            await LoginHandler(loginData, navigate); // Ro'yxatdan so'ng login qilish
        } else {
            toast.error(res.data.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
        }
    } catch (err) {
        console.log(err);
        toast.error("Ro'yxatdan o'tishda xatolik yuz berdi");
    }
};

export const LoginHandler = async (data, navigate) => {
    if (data.login.trim().length === 0) {
        return toast.error("Iltimos emailingizni kiriting");
    }
    if (data.password.trim().length === 0) {
        return toast.error("Iltimos parolni kiriting");
    }
    try {
        const res = await BASE_CONFIG.doPost(APP_API.login, data);
        if (res.status === 200 || res.status === 201 || res.status === 204) {
            localStorage.setItem("token", res.data.accessToken);
            toast.success("Hush kelibsiz");
            // GetMe funksiyasini chaqirib foydalanuvchi ma'lumotlarini tekshirish
            await GetMe(navigate);
            navigate("/cabinet");
        }
    } catch (err) {
        console.log(err);
        toast.error("Hisob mavjud emas");
    }
};
