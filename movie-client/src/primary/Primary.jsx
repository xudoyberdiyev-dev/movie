import {Header} from "../components/Header.jsx";
import {Genre} from "../genre/Genre.jsx";
import {Section} from "../slider/Section.jsx";
import {Premyera} from "../movies/premyera/Premyera.jsx";
import {HindMovie} from "../movies/hind/HindMovie.jsx";
import {UzbMovie} from "../movies/uzb/UzbMovie.jsx";
import {Multfilm} from "../movies/multfilm/Multfilm.jsx";
import {Anime} from "../movies/anime/Anime.jsx";
import {RetroMovie} from "../movies/retro/RetroMovie.jsx";
import {Footer} from "../components/Footer.jsx";
import {Serial} from "../movies/serial/Serial.jsx";

import rasm1 from "../assets/images/shape-1.png"
import rasm2 from "../assets/images/shape-2.png"
import rasm3 from "../assets/images/shape-3.png"
import {Register} from "../auth/Register.jsx";
import {Login} from "../auth/Login.jsx";

export const Primary = () => {
    return (
        <div>
            <Header/>
            <main>
                <Genre/>
                <div className="overlay" overlay="" menu-toggler=""></div>
                <article className="container" page-content="">
                    <img src={rasm1} className="shape-1 shape-2" alt="shape"/>
                    <img src={rasm2} className="shape-1 shape-3" alt="shape"/>
                    <img src={rasm3} className="shape-1" alt="shape"/>
                    <Section/>
                    <Premyera/>
                    <HindMovie/>
                    <UzbMovie/>
                    <Multfilm/>
                    <Anime/>
                    <RetroMovie/>
                    <Serial/>
                    <Footer/>
                </article>
                <div className="search-model"></div>
            </main>
        </div>
    )
}