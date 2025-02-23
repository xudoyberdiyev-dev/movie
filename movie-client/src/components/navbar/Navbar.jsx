import React, {useEffect, useState} from 'react'
import './navbar.css'
import MobileNav from "./mobilrNav/MobileNav.jsx";
import {SearchBar} from "./SearchBar.jsx";
import {FaSearch} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import logo from '../../assets/images/logo.png'

export const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [openMenu, setOpenMenu] = useState(false)
    const [openSearchBar, setOpenSearchBar] = useState(false)
    const toggleMenu = () => {
        setOpenMenu(!openMenu)
    }
    const toggleSearchBar = () => {
        setOpenSearchBar(!openSearchBar)
    }

    useEffect(() => {
        const token = localStorage.getItem("token"); // Token localStorage yoki sessionStorage da saqlanishi mumkin
        setIsAuthenticated(!!token); // Token bor bo‘lsa, foydalanuvchi tizimga kirgan deb hisoblanadi
    }, []);


    return (
        <>
            <MobileNav isOpen={openMenu} toggleMenu={toggleMenu}/>
            <SearchBar isOpen={openSearchBar} toggleMenu={toggleSearchBar}/>
            <nav className="nav-wrapper">
                <div className="nav-content">
                    <div className={'logos'}></div>
                    <ul>
                        <li>
                            <bytton className="contact-btn" onClick={toggleSearchBar}><FaSearch
                                style={{fontSize: "25px"}}/></bytton>
                        </li>
                        <li>
                            <Link to={'/register'}>
                                <bytton className="contact-btn">Register</bytton>
                            </Link>
                        </li>

                        <Link to={isAuthenticated ? "/cabinet" : '/login'}>
                            <bytton className="contact-btn">{isAuthenticated ? "Kirish" : "Login"}</bytton>
                        </Link>
                    </ul>
                    <button className="menu-btn" onClick={toggleMenu}>
                <span class={"material-symbils-outlined"}
                      style={{fontSize: '1.8rem'}}>

                    {openMenu ? <i className='bi bi-trash'></i> : <i className='bi bi-star'></i>}
                </span>
                    </button>
                </div>
            </nav>
        </>
    )
}

