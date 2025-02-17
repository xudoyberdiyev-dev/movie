import {useEffect, useState} from "react";
import {APP_API} from "../service/AppApi.js";
import {GetAuto} from "../service/userService/AppService.js";
import {BASE_URL} from "../service/BaseUrl.js";
import {Loading} from "../components/loading/Loading.jsx";
import buttonLogo from '../assets/images/play_circle.png'
import {useNavigate} from "react-router-dom";
import './slider.css'

export const Slider = () => {
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0);
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(false)

    const getAll = async () => {
        try {
            const res = await GetAuto(APP_API.getPremyeraMovie, 'data')
            setMovie(res.data)
            setLoading(true)
            console.log("dada" + res)
        } catch (err) {
            console.log(err)
        }
    }
    const changeSlide = (direction) => {
        if (direction === 'next') {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movie.length);
        } else if (direction === 'prev') {
            setCurrentIndex(
                (prevIndex) => (prevIndex - 1 + movie.length) % movie.length
            );
        }
    };
    const oneMovie = (id) => {
        navigate("/movie-item/" + id)
    }

    useEffect(() => {
        getAll()
    }, []);

    return (
        <section className="banner" aria-label="Popular Movies">
            <div className="banner-slider">
                {movie.length !== 0 ? (
                    <>
                        {movie.map((item, i) => (
                            <div onClick={() => oneMovie(item.id)}
                                 style={{cursor: "pointer"}}
                                 key={i}
                                 className={`slider-item ${currentIndex === i ? 'active' : ''}`}
                            >
                                <img
                                    src={`${BASE_URL}${APP_API.downloadImage}${item.img}`}
                                    loading="eager"
                                    alt={item.name}
                                    className="img-cover"
                                />
                                <div className="banner-content">
                                    <h2 className="heading">{item.name}</h2>
                                    <div className="meta-list">
                                        <div className="meta-item">{item.movieYear}</div>
                                        <div className="meta-item card-badge">
                                            {item.age.substring(1, 3)}+
                                        </div>
                                    </div>
                                    <p className="genre">
                                        {item.genres.slice(0, 8).join(' ')}
                                    </p>
                                    <button className="btn" onClick={() => oneMovie(item.id)}>
                                        <img
                                            src={buttonLogo}
                                            width="24"
                                            height="24"
                                            alt="play circle"
                                        />
                                        <span className="span">Hoziroq Ko'rish</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <Loading/>
                )}
            </div>

            <div className="nav">
                <button className="btn prev" onClick={() => changeSlide('prev')}>
                    ‹
                </button>
                <button className="btn next" onClick={() => changeSlide('next')}>
                    ›
                </button>
            </div>

            <div className="slider-control">
                <div className="control-inner">
                    {movie.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`poster-box slider-item ${currentIndex === i ? 'active' : ''}`}
                        >
                            <img
                                src={`${BASE_URL}${APP_API.downloadImage}${item.img}`}
                                loading="lazy"
                                className="img-cover img-zoom"
                                alt={item.name}
                                draggable="false"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}