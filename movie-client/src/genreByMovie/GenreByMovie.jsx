import { Header } from "../components/Header.jsx";
import { Genre } from "../genre/Genre.jsx";
import { useEffect, useState } from "react";
import { GetAuto } from "../service/userService/AppService.js";
import { APP_API } from "../service/AppApi.js";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../service/BaseUrl.js";
import fon1 from '../assets/images/shape-1.png';
import fon2 from '../assets/images/shape-2.png';
import fon3 from '../assets/images/shape-3.png';
import { MDBSpinner, MDBBtn } from 'mdb-react-ui-kit';

export const GenreByMovie = () => {
    const navigate = useNavigate();
    const { genre } = useParams();

    const [allMovies, setAllMovies] = useState([]); // Barcha kinolar
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const getMoviesByGenre = async (currentPage = 0) => {
        setLoading(true);
        try {
            const res = await GetAuto(APP_API.getGenreByMovie + `?genre=${genre}&page=${currentPage}&size=20`);
            if (res && res.data) {
                const newMovies = res.data.content;

                // 🔥 Takrorlanmasligi uchun `id` bo‘yicha filtrlaymiz
                setAllMovies(prev => {
                    const uniqueMovies = [...prev, ...newMovies].filter((movie, index, self) =>
                        index === self.findIndex(m => m.id === movie.id)
                    );
                    return uniqueMovies;
                });

                setTotalPages(res.data.totalPages);
                setPage(currentPage);
            } else {
                console.log("Javobda data yo‘q:", res);
            }
        } catch (err) {
            console.log("Xatolik: janr bo‘yicha kinolarni olishda muammo yuz berdi", err);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreMovies = () => {
        if (page + 1 < totalPages) {
            getMoviesByGenre(page + 1);
        }
    };

    const oneMovie = (id) => navigate(`/movie-item/${id}`);

    useEffect(() => {
        if (genre) {
            setAllMovies([]); // Eski malumotlarni tozalash
            setPage(0);
            setTotalPages(1);
            getMoviesByGenre(0);
        }
    }, [genre]);

    return (
        <div>
            <Header />
            <main>
                <Genre selectedGenre={genre} setAllMovies={setAllMovies} />
                <div className="overlay" overlay="" menu-toggler=""></div>

                <article className="container" page-content="">
                    <img src={fon3} className="shape-1 shape-list" alt="shape" />
                    <img src={fon2} className="shape-1 shape-3" alt="shape" />
                    <img src={fon1} className="mob-shape-1 mob-shape-list-1" alt="" />
                    <img src={fon2} className="mob-shape-1 mob-shape-2 mob-shape-list-2" alt="" />

                    <section className="movie-list genre-list" aria-label="Adventure Movies">
                        <div className="title-wrapper contain">
                            <h1 className="heading">{genre}</h1>
                            <h1 className="heading">{genre}</h1>
                        </div>

                        <div className="grid-list">
                            {allMovies.map((item, i) => (
                                <div onClick={() => oneMovie(item.id)} className="movie-card" key={item.id}>
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
                            page + 1 < totalPages && (
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
    );
};
