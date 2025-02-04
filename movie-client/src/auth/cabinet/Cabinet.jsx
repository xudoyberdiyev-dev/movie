import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const Cabinet = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login"); // Token bo'lmasa login sahifasiga yo'naltirish
        }
    }, [navigate]);

    return (
        <div>
            <h1>Cabinet Sahifasi</h1>
            {/* Foydalanuvchi ma'lumotlari va boshqa kontent */}
        </div>
    );
};
