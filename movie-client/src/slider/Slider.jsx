import {useEffect, useState} from "react";
import {APP_API} from "../service/AppApi.js";
import {GetAuto} from "../service/userService/AppService.js";
import {BASE_URL} from "../service/BaseUrl.js";
import {Loading} from "../components/Loading.jsx";
import buttonLogo from '../assets/images/play_circle.png'
import {useNavigate} from "react-router-dom";

export const Slider = () => {
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

    useEffect(() => {
        getAll()
    }, []);
    const navigate = useNavigate()
    const oneMovie = (id) => {
        navigate("/movie-item/" + id)
    }
    return (
        <div>
            <div className="banner-slider">
                {loading && movie.length !== 0 ? (
                    <>
                        {movie.map((item, i) => (
                            <div className="slider-item active" slider-item="" onClick={() => oneMovie(item.id)}>
                                <img src={`${BASE_URL}${APP_API.downloadImage}${item.img}`} loading="eager"
                                     alt="Deadpool &amp; Wolverine" className="img-cover"/>

                                <div className="banner-content">

                                    <h2 className="heading">{item.name}</h2>

                                    <div className="meta-list">
                                        <div className="meta-item">{item.movieYear}</div>

                                        <div className="meta-item card-badge">{item.age.substring(1, 3)}+</div>
                                    </div>

                                    <p className="genre">
                                        {item.genres.slice(0, 8).join(' ')}
                                    </p>

                                    <p className="banner-text">
                                        {item.description}
                                    </p>

                                    <button className="btn" onClick={() => oneMovie(item.id)}>
                                        <img src={buttonLogo} width="24" height="24"
                                             aria-hidden="true"
                                             alt="play circle"/>
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
        </div>
    )
}