import toast from "react-hot-toast";
import {BASE_CONFIG} from "../BaseConfig.js";
import {APP_API} from "../AppApi.js";

// 🔹 Ro'yxatdan o'tish
export const RegisterHandler = async (data, navigate) => {
    const validations = [
        {check: data.name.trim().length === 0, message: "Ismni kiriting"},
        {check: data.surname.trim().length === 0, message: "Familyani kiriting"},
        {check: data.email.trim().length === 0, message: "Email bo'sh bo'lmasligi shart"},
        {check: !data.email.trim().endsWith("@gmail.com"), message: "Email xato ❌"},
        {check: data.password.trim().length < 8, message: "Parol 8ta belgidan iborat bo'lishi shart"}
    ];

    // Validatsiya tekshiruvlari
    for (const validation of validations) {
        if (validation.check) {
            return toast.error(validation.message);
        }
    }

    try {
        const res = await BASE_CONFIG.doPost(APP_API.register, data);
        if (res.data && res.data.accessToken) {
            // Token va foydalanuvchi ma'lumotlarini saqlash
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("surname", res.data.surname);
            localStorage.setItem("email", res.data.email);

            toast.success(`Xush kelibsiz, ${res.data.userDto.name}!`);
            navigate("/cabinet");

            // Login qilish uchun LoginHandler'ni chaqirish
            const loginData = {login: data.email, password: data.password};
            await LoginHandler(loginData, navigate);
            window.location.reload()
        } else {
            toast.error("Ro'yxatdan o'tishda xatolik yuz berdi");
        }
    } catch (err) {
        console.error("RegisterHandler xatosi:", err);
        toast.error("Ro'yxatdan o'tishda xatolik yuz berdi");
    }
};

// 🔹 Kirish
export const LoginHandler = async (data, navigate) => {
    if (data.login.trim().length === 0) {
        return toast.error("Iltimos emailingizni kiriting");
    }
    if (data.password.trim().length === 0) {
        return toast.error("Iltimos parolni kiriting");
    }

    try {
        const res = await BASE_CONFIG.doPost(APP_API.login, data);
        if (res.data && res.data.accessToken) {
            // Token va foydalanuvchi ma'lumotlarini saqlash
            localStorage.setItem("token", res.data.accessToken);

            // getUserInfo orqali foydalanuvchi ma'lumotlarini olish
            getUserInfo(data.login, navigate);  // Foydalanuvchi ma'lumotlarini olish

            // toast.success(`Xush kelibsiz, ${res.data.userDto.name}!`);
            navigate("/cabinet");
        }
    } catch (err) {
        console.error("LoginHandler xatosi:", err);
        toast.error("Hisob mavjud emas yoki noto‘g‘ri ma’lumot kiritildi");
    }
};

// 🔹 Foydalanuvchi ma'lumotlarini olish
export const getUserInfo = async (email, navigate) => {
    try {
        const res = await BASE_CONFIG.doGet(`${APP_API.getMe}/${email}`);
        if (res.data) {
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("surname", res.data.surname);
            localStorage.setItem("email", res.data.email);
            // toast.success(`Xush kelibsiz, ${res.data.name}!`);
            navigate("/cabinet");
        } else {
            toast.error("Foydalanuvchi ma'lumotlari topilmadi");
        }
    } catch (err) {
        console.error("getUserInfo xatosi:", err);
        toast.error("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi");
    }
};
