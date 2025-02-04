import toast from "react-hot-toast";
import { BASE_CONFIG } from "../BaseConfig.js";
import { APP_API } from "../AppApi.js";

// 🔹 Foydalanuvchini ro‘yxatdan o‘tkazish
export const RegisterHandler = async (data, navigate) => {
    const validations = [
        { check: data.name.trim().length === 0, message: "Ismni kiriting" },
        { check: data.surname.trim().length === 0, message: "Familyani kiriting" },
        { check: data.email.trim().length === 0, message: "Email bo'sh bo'lmasligi shart" },
        { check: !data.email.trim().endsWith("@gmail.com"), message: "Email xato ❌" },
        { check: data.password.trim().length < 8, message: "Parol 8 ta belgidan iborat bo'lishi shart" },
    ];

    for (const validation of validations) {
        if (validation.check) {
            return toast.error(validation.message);
        }
    }

    try {
        const res = await BASE_CONFIG.doPost(APP_API.register, data);
        if (res.data && res.data.success) {
            localStorage.setItem("token", res.data.accessToken); // Tokenni saqlash
            localStorage.setItem("id", res.data.id); // ID ni saqlash
            toast.success("Xush kelibsiz!");

            // 🔹 Ro'yxatdan o'tgandan keyin avtomatik login qilish
            const loginData = { login: data.email, password: data.password };
            await LoginHandler(loginData, navigate);
        } else {
            toast.error(res.data.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
        }
    } catch (err) {
        console.error("RegisterHandler xatosi:", err);
        toast.error("Ro'yxatdan o'tishda xatolik yuz berdi");
    }
};

// 🔹 Login qilish
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
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("id", res.data.userId); // ID ni saqlash

            toast.success("Hush kelibsiz!");
            navigate("/cabinet");

            // 🔹 Sahifani qayta yuklamasdan, login sessiyasini yangilash
            setTimeout(() => {
                navigate(0);
            }, 500);
        }
    } catch (err) {
        console.error("LoginHandler xatosi:", err);
        toast.error("Hisob mavjud emas yoki xato ma'lumot kiritildi");
    }
};
