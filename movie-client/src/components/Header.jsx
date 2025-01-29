import {Link} from "react-router-dom";
import logo from "../assets/images/logo.png"
import serach from "../assets/images/search.png"
import close from "../assets/images/close.png"
import menu from "../assets/images/menu.png"
import menuClose from "../assets/images/menu-close.png"
import {Search} from "./Search.jsx";

export const Header = () => {
    return (
        <div>
            <header className="header">

                <a className="logo" href="/public">
                    <Link to={'/'}><img src={logo} width="140" height="32"
                                        alt="Tvflix home"/></Link></a>
                <Search/>
                <Link to={"/register"}>Register</Link>
                <div></div>
                <div></div>
                <Link to={"/login"}>Login</Link>


                <button className="search-btn" search-toggler="" menu-close="">
                    <img src={serach} width="24" height="24" alt="open search box"/>
                </button>

                <button className="menu-btn" menu-toggler="" menu-btn="">
                    <img src={menu} width="24" height="24" alt="open menu" className="menu"/>

                    <img src={menuClose} alt="close menu" width="24" height="24"
                         className="close"/>
                </button>

            </header>
        </div>
    )
}