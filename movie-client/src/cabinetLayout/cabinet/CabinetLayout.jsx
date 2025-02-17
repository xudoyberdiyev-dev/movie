import {CabinetSidebar} from "./CabinetSidebar.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Login} from "../../auth/login/Login.jsx";
export const CabinetLayout = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/login"); // Token bo'lmasa login sahifasiga yo'naltirish
        }
    }, [navigate]);
    return (
        token ? (
            <div className={'primary-cabinet'}>
                <CabinetSidebar/>
                <div className={'home'}>
                    <Outlet/>
                </div>
            </div>
        ) : (
            <Login/>
        )
    )
}