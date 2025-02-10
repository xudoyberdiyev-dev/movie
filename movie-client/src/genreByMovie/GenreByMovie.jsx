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
import { MDBSpinner, MDBBtn } from 'mdb-react-ui-kit';

export const GenreByMovie = () => {
    const navigate = useNavigate();
    const [allMovies, setAllMovies] = useState([]); // Movies related to selected genre
    const [visibleMovies, setVisibleMovies] = useState([]); // Ko‘rinayotgan kinolar
    const [visibleCount, setVisibleCount] = useState(2); // Nechta ko‘rsatishni boshqarish
    const {genre} = useParams();

    const [loading, setLoading] = useState(false)

    const getMoviesByGenre = async (genre) => {
        try {
            const res = await GetAuto(APP_API.getGenreByMovie + `?genre=${genre}`)
            if (res && res.data) {
                setAllMovies(res.data.reverse()); // Yangi kinolarni birinchi qilish uchun reverse qilish
                setVisibleMovies(res.data.slice(0, 2)); // Dastlab 2 tasini ko‘rsatamiz
            } else {
                console.log("Javobda data yo'q:", res);
            }
        } catch (err) {
            console.log("Error fetching allMovies by genre:", err);
        }
    };
    const loadMoreMovies = () => {
        setLoading(true); // Loadingni yoqish

        setTimeout(() => {
            const newCount = visibleCount + 2;
            setVisibleCount(newCount);
            setVisibleMovies(allMovies.slice(0, newCount)); // Yangi 2 tasini qo‘shish
            setLoading(false); // 1 sekunddan keyin loading tugaydi
        }, 1000);
    };

    const oneMovie = (id) => {
        navigate("/movie-item/" + id);
    };
    useEffect(() => {
        if (genre) {
            setAllMovies([]); // Yangi janr tanlanganda eski kinolarni tozalaymiz
            setVisibleMovies([]);
            setVisibleCount(2);
            getMoviesByGenre(genre);
        }
    }, [genre]);
    return (
        <div>
            <Header/>
            <main>
                <Genre selectedGenre={genre} setAllMovies={setAllMovies}/>
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
                            {visibleMovies.map((item, i) => (
                                <div onClick={() => oneMovie(item)} className="movie-card" key={i}>
                                    <figure className="poster-box card-banner">
                                        <a>
                                            <img
                                                src={`${BASE_URL}${APP_API.downloadImage}${item.img}`}
                                                alt={item.name}
                                                className="img-cover img-zoom"
                                                loading="lazy"
                                            />
                                        </a>
                                    </figure>

                                    <h4 className="title">{item.name}</h4>

                                    <div className="meta-list">
                                        <div className="meta-item">
                                            <span className="span">{item.seeSize}</span>
                                        </div>
                                        <div className="card-badge">{item.age.substring(1, 3)}+</div>
                                    </div>
                                </div>
                            ))}


                        </div>

                        {loading ? (
                            <MDBBtn disabled>
                                <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                                Loading...
                            </MDBBtn>
                        ) : (
                            visibleCount < allMovies.length && (
                                <button className="btn load-more" onClick={loadMoreMovies}>
                                Yana Ko'rish
                                </button>
                            )
                        )}

                    </section>
                </article>

                <div className="search-model"></div>
            </main>
        </div>
    )
}