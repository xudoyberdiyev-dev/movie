import {useEffect, useState} from "react";
import {GetAuto} from "../../service/userService/AppService.js";
import {APP_API} from "../../service/AppApi.js";
import {BASE_URL} from "../../service/BaseUrl.js";
import {useNavigate} from "react-router-dom";

export const RandomMovie = () => {
    const [movie, setMovie] = useState([]);
    const navigate = useNavigate()


    const getRandomMovies = async () => {
        try {
            const res = await GetAuto(APP_API.randomMovie);
            setMovie(res.data);
        } catch (error) {
            console.log("Error fetching random movies:", error);
        }
    };
    const oneMovie = (id) => {
        navigate("/movie-item/" + id)
        window.location.reload()
    }
    useEffect(() => {
        getRandomMovies();
    }, []);

    return (
        <section className="movie-list" aria-label="You May Also Like">
            <div className="title-wrapper">
                <h3 className="title-large">Tasodifiy Kinolar...</h3>
            </div>

            <div className="slider-list">
                <div className="slider-inner">
                    {movie.map((item, i) => (
                        <div className="movie-card" key={i}>
                            <figure className="poster-box card-banner" onClick={() => oneMovie(item.id)}>
                                <a>
                                    <img src={`${BASE_URL}${APP_API.downloadImage}${item.img}`}
                                         alt="Bad" ride="" or="" die="" className="img-cover img-zoom"
                                         loading="lazy"/>
                                </a>
                            </figure>

                            <h4 className="title">{item.name}</h4>

                            <div className="meta-list">
                                <div className="meta-item">
                                    <span className="span">{item.seeSize}</span>
                                </div>

                                <div className="card-badge">{item.age.substring(1,3)}+</div>
                            </div>

                            <a href="./detail.html" className="card-btn" title="Bad Boys: Ride or Die"
                               onClick="getMovieDetail(573435)"></a>

                        </div>

                    ))}
                </div>
            </div>
        </section>

    )
}