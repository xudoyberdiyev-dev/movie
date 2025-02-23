import React from 'react'
import './MobileNav.css'
import {Genre} from "../../../genre/Genre.jsx";
const MobileNav = ({isOpen,toggleMenu}) => {
    return (
        <>
            <div className={`mobile-menu ${isOpen?'active':""}`}
                 onClick={toggleMenu}
            >
                <div className="mobile-menu-container">
                    <Genre/>
                </div>
            </div>
        </>
    )
}

export default MobileNav