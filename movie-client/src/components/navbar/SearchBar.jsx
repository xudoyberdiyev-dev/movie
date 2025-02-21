import './Serachber.css'
import React from "react";

export const SearchBar = ({isOpen,toggleMenu}) => {
    return (
        <div className={`search-bar ${isOpen ? 'active' : ""}`}
             onClick={toggleMenu}
        >
            <div className="serach-container">
                <h1 className={'logo'}>Logo</h1>
            </div>
        </div>
    )
}