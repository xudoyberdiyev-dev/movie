import React, {useState} from "react";
import {Search} from "../search/Search.jsx";
import './navbar.css'
export const Navbar = () => {
    return (
        <nav>
            <div className={"navbarr"}>
                <div className={'logoo'}>
                    <h1 className={'img-logo'}>LOGO</h1>
                    <Search/>
                    <button>Tegister</button>
                    <button>Login</button>
                </div>

            </div>

            <div className={'hr'}></div>
        </nav>
    )
}