import React from 'react'
import './MobileNav.css'
const MobileNav = ({isOpen,toggleMenu}) => {
    return (
        <>
            <div className={`mobile-menu ${isOpen?'active':""}`}
                 onClick={toggleMenu}
            >
                <div className="mobile-menu-container">
                    <h1 className={'logo'}>Logo</h1>
                </div>
            </div>
        </>
    )
}

export default MobileNav