import {Header} from "../../components/Header.jsx";
import {Genre} from "../../genre/Genre.jsx";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {GetAuto, GetOneMovie} from "../../service/userService/AppService.js";
import {BASE_URL} from "../../service/BaseUrl.js";
import {APP_API} from "../../service/AppApi.js";
import {Loading} from "../../components/Loading.jsx";
import {RandomMovie} from "../randomMovie/RandomMovie.jsx";
import {BASE_CONFIG, BASE_CONFIG_CLIENT} from "../../service/BaseConfig.js";
import toast from "react-hot-toast";

export const MovieItem = () => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState({})
    const [videos, setVideos] = useState([])
    const id = useParams().id
    const videoRef = useRef(null);
    const getOneMovie = async () => {
        try {
            const res = await GetOneMovie(id)
            setMovie(res)
            setLoading(true)
        } catch (err) {
            console.log(err)
        }
    }
    const getVideo = async () => {
        try {
            const res = await GetAuto(`${APP_API.newSerial}/${id}`)
            setVideos(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const sendLike = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await BASE_CONFIG_CLIENT.doPost(
                `${APP_API.sendLike}/${id}`,
                {}, // Yuborilishi kerak bo'lgan body (agar kerak bo'lsa)
            );
            // Agar `ApiResponse`ga yangi o'zgarish kiritgan bo'lsangiz, bu yerda qo'shimcha logika
            setLiked(res.data.liked); // Like holatini yangilash (Agar siz `liked`ni qaytarsangiz)
            setLikeCount(res.data.likeSize); // Like sonini yangilash (Agar siz `likeSize`ni qaytarsangiz)
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 403) {
                toast.error("Ruxsat yo'q. Iltimos, tizimga kirganingizni tekshirib ko'ring.");
            } else if (error.response && error.response.data.message === "Siz ro'yxatdan o'tmagansiz") {
                toast.error("Siz ro'yxatdan o'tmagansiz");
            }
        }
    };
    useEffect(() => {
        getOneMovie()
        getVideo()
    }, []);
    return (<div>
        <Header/>
        <main>
            <Genre/>
            <div className="overlay " overlay="" menu-toggler=""></div>

            <article className="container" page-content="">
                <img src="../../assets/images/shape-3.png" className="shape-1 shape-detail" alt="shape"/>


                <img src="../../assets/images/shape-1.png" className="mob-shape-1 mob-shape-detail-1" alt=""/>
                <img src="../../assets/images/shape-2.png" className="mob-shape-1 mob-shape-2 mob-shape-detail-2"
                     alt=""/>
                {loading ? (<div className="movie-detail">
                        <div className="backdrop-image "
                             style={{
                                 backgroundImage: `url('${BASE_URL}${APP_API.downloadImage}${movie.img}')`,
                                 backgroundRepeat: "no-repeat",
                                 backgroundSize: "cover",
                                 backgroundPosition: "center"
                             }}>
                        </div>

                        <figure className="poster-box movie-poster">
                            <img src={`${BASE_URL}${APP_API.downloadImage}${movie.img}`}
                                 alt="Deadpool &amp; Wolverine" className="img-cover"/>
                        </figure>

                        <div className="detail-box">

                            <div className="detail-content">

                                <h1 className="heading">{movie.name}</h1>

                                <div className="meta-list">
                                    <div className="meta-item">
                                        {/*<button*/}
                                        {/*    onClick={()=>sendLike()}*/}
                                        {/*    style={{color: liked ? 'red' : 'gray'}}*/}
                                        {/*    disabled={!liked} // Like faqat royxatdan o'tgan foydalanuvchi uchun*/}
                                        {/*>*/}
                                        {/*    Like ({likeCount})*/}
                                        {/*</button>*/}
                                        <div>
                                            <p>Likes: {likeCount}</p>
                                            <button onClick={sendLike}>
                                                {liked ? "Unlike" : "Like"}
                                            </button>
                                        </div>
                                        {/*<button onClick={() => sendLike()}>*/}
                                        {/*    <i className="fa-solid fa-heart fa-xl"*/}
                                        {/*       style={{color: "#ff0000"}}></i>*/}
                                        {/*</button>*/}
                                        {/*<span className="span">1.1</span>*/}
                                    </div>

                                    <div className="separator"></div>

                                    <div className="meta-item"><i
                                        className="fa-regular fa-hourglass-half "></i> {movie.movieTime}m
                                    </div>

                                    <div className="separator"></div>

                                    <div className="meta-item"><i
                                        className={'fa-solid fa-calendar-days'}></i>{movie.movieYear}</div>

                                    <div className="separator"></div>
                                    <div className="meta-item card-badge">{movie.age.substring(1, 3)}+</div>

                                </div>

                                <p className="genre"
                                   style={{color: "wheat"}}> {movie.genres.slice(0, 8).join(' ')}</p>


                                <ul className="detail-list">

                                    <div className="list-item">
                                        <p className="list-name">Kino Vaqti </p>

                                        <p className="detail-para">
                                            {movie.movieTime} m
                                        </p>
                                    </div>

                                    <div className="list-item">
                                        <p className="list-name">Kino Yili</p>

                                        <p className="detail-para">
                                            {movie.movieYear}
                                        </p>
                                    </div>

                                    <div className="list-item" providers="">
                                        <p className="list-name">Kino Davlati</p>

                                        <p className="detail-para" providers-p="">
                                            {movie.movieCountry}
                                        </p>
                                    </div>

                                    <div className="list-item" providers="">
                                        <p className="list-name">Kino Tili </p>

                                        <p className="detail-para" providers-p="">
                                            {movie.language} tilida
                                        </p>
                                    </div>

                                    <div className="list-item">
                                        <p className="list-name">Kino Haqida</p>

                                        <p className="detail-para">
                                            {movie.description}
                                        </p>
                                    </div>

                                </ul>
                            </div>

                            <div className="title-wrapper">
                                <h3 className="title-large">Kino va Seriallar {Math.ceil(movie.seeSize)}</h3>
                            </div>

                            <div className="slider-list">
                                <div className="slider-inner">
                                    <div className="video-card">

                                        <video frameBorder="0" ref={videoRef}
                                               allowFullScreen="1" title="Billion with a B" className="img-cover"
                                               loading="lazy" width="500" height="294" controls>
                                            <source src={`${BASE_URL}${APP_API.downloadVideo}${movie.video}`}
                                                    type="video/mp4"/>
                                            <source src={`${BASE_URL}${APP_API.downloadVideo}${movie.video}`}
                                                    type="video/webm"/>
                                            <source src={`${BASE_URL}${APP_API.downloadVideo}${movie.video}`}
                                                    type="video/ogg"/>
                                        </video>

                                    </div>
                                    {movie.subCategoryType === "SERIAL" && videos.length > 0 ? (
                                        <>
                                            {videos.map((item, i) => (
                                                <div className="video-card" style={{position: 'relative'}}>
                                                    <div
                                                        style={{position: 'absolute', margin: '8px'}}>{item.title}</div>
                                                    <video frameBorder="0" ref={videoRef}
                                                           allowFullScreen="1" title="Billion with a B"
                                                           className="img-cover" loading="lazy"
                                                           width="294" height="294" controls>
                                                        <source src={`${BASE_URL}${APP_API.downloadVideo}${item.video}`}
                                                                type="video/mp4"/>
                                                        <source src={`${BASE_URL}${APP_API.downloadVideo}${item.video}`}
                                                                type="video/webm"/>
                                                        <source src={`${BASE_URL}${APP_API.downloadVideo}${item.video}`}
                                                                type="video/ogg"/>
                                                    </video>
                                                </div>

                                            ))}
                                        </>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (<Loading/>)}
                <RandomMovie/>
            </article>
            <div className="search-model"></div>
        </main>
    </div>)
}