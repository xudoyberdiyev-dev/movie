import './Serachber.css'
import React from "react";
import { FaMicrophone, FaSearch, FaKeyboard } from "react-icons/fa";
import {Search} from "../search/Search.jsx";

export const SearchBar = ({isOpen, toggleMenu}) => {
    const handleClickOutside = (e) => {
        // Agar foydalanuvchi `search-container` dan tashqarida bossa, yopiladi
        if (e.target.classList.contains('search-bar')) {
            toggleMenu();
        }
    };
    return (
        <div className={`search-bar ${isOpen ? 'active' : ""}`}
             onClick={handleClickOutside}
        >
            <div className="serach-container">
               <Search/>
            </div>
        </div>
    )
}