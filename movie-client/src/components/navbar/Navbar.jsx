import React, {useState} from 'react'
import './navbar.css'
import MobileNav from "./MobileNav.jsx";
import {SearchBar} from "./SearchBar.jsx";

export const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const [openSearchBar, setOpenSearchBar] = useState(false)
    const toggleMenu = () => {
        setOpenMenu(!openMenu)
    }
    const toggleSearchBar = () => {
        setOpenSearchBar(!openSearchBar)
    }

    return (
        <>
            <MobileNav isOpen={openMenu} toggleMenu={toggleMenu}/>
            <SearchBar isOpen={openSearchBar} toggleMenu={toggleSearchBar}/>
            <nav className="nav-wrapper">
                <div className="nav-content">
                    <h1 className={'logo'}>LOGO</h1>
                    <ul>
                        <li>
                            <bytton className="contact-btn" onClick={toggleSearchBar}>h</bytton>
                        </li>
                        <li>
                            <bytton className="contact-btn">Register</bytton>
                        </li>

                        <bytton className="contact-btn">Login</bytton>
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

