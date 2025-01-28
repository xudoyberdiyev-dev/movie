import {Header} from "../components/Header.jsx";
import {Genre} from "../genre/Genre.jsx";
import {useEffect, useState} from "react";
import {GetAuto} from "../service/userService/AppService.js";
import {APP_API} from "../service/AppApi.js";
import {useNavigate, useParams} from "react-router-dom";
import {BASE_URL} from "../service/BaseUrl.js";
import fon1 from '../assets/images/shape-1.png'
import fon2 from '../assets/images/shape-2.png'
import fon3 from '../assets/images/shape-3.png'

export const GenreByMovie = () => {
    const [movies, setMovies] = useState([]); // Movies related to selected genre
    const {genre} = useParams();  // Ta

    const getMoviesByGenre = async (genre) => {
        try {
            const res = await GetAuto(APP_API.getGenreByMovie + `?genre=${genre}`)
            if (res && res.data) {
                setMovies(res.data.reverse()); // Yangi kinolarni birinchi qilish uchun reverse qilish
            } else {
                console.log("Javobda data yo'q:", res);
            }
        } catch (err) {
            console.log("Error fetching movies by genre:", err);
        }
    };
    const navigate = useNavigate();
    const oneMovie = (id) => {
        navigate("/movie-item/" + id);
    };
    useEffect(() => {
        if (genre) {
            getMoviesByGenre(genre);
        }
    }, [genre]);
    return (
        <div>
            <Header/>
            <main>
                <Genre selectedGenre={genre} setMovies={setMovies}/>
                <div className="overlay " overlay="" menu-toggler=""></div>

                <article className="container" page-content="">
                    <img src={fon3} className="shape-1 shape-list" alt="shape"/>
                    <img src={fon2} className="shape-1 shape-3" alt="shape"/>


                    <img src={fon1} className="mob-shape-1 mob-shape-list-1" alt=""/>
                    <img src={fon2} className="mob-shape-1 mob-shape-2 mob-shape-list-2"
                         alt=""/>

                    <section className="movie-list genre-list" aria-label="Adventure Movies">

                        <div className="title-wrapper contain">
                            <h1 className="heading">{genre}</h1>

                            <h1 className="heading">{genre}</h1>
                        </div>

                        <div className="grid-list">
                            {movies.map((item, i) => (
                                <div className="movie-card">

                                    <figure className="poster-box card-banner" key={i}
                                            onClick={() => oneMovie(item.id)}>
                                        <a>
                                            <img
                                                src={`${BASE_URL}${APP_API.downloadImage}${item.img}`}
                                                alt="Inside"
                                                out="" className="img-cover img-zoom" loading="lazy"/>
                                        </a>
                                    </figure>

                                    <h4 className="title">{item.name}</h4>

                                    <div className="meta-list">
                                        <div className="meta-item">
                                            Yil :

                                            <span className="span">{item.movieYear}</span>
                                        </div>

                                        <div className="card-badge">{item.botId}</div>
                                    </div>

                                    <a href="./detail.html" className="card-btn" title="Inside Out 2"
                                       onClick="getMovieDetail(1022789)"></a>
                                </div>

                            ))}


                        </div>

                        <button className="btn load-more" load-more="">Load More</button>

                    </section>
                </article>

                <div className="search-model"></div>
            </main>
        </div>
    )
}