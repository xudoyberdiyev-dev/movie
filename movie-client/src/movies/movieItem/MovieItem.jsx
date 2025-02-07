import {Header} from "../../components/Header.jsx";
import {Genre} from "../../genre/Genre.jsx";
import {useEffect, useState, useRef} from "react";
import {useParams} from "react-router-dom";
import {GetAuto, GetOneMovie} from "../../service/userService/AppService.js";
import {BASE_URL} from "../../service/BaseUrl.js";
import {APP_API} from "../../service/AppApi.js";
import {Loading} from "../../components/Loading.jsx";
import {RandomMovie} from "../randomMovie/RandomMovie.jsx";
import {BASE_CONFIG, BASE_CONFIG_CLIENT} from "../../service/BaseConfig.js";
import toast from "react-hot-toast";

export const MovieItem = ({userId}) => {
    const [liked, setLiked] = useState(false); // Like holatini saqlash
    const [loading, setLoading] = useState(true); // Loading holati
    const [movie, setMovie] = useState({}); // Film ma'lumotlari
    const [videos, setVideos] = useState([]); // Seriallar qolgan qismlari  ro'yxati
    const {id} = useParams(); // URL'dan film ID'sini olish
    const videoRef = useRef(null);


    // **Bitta filmni olish**
    const getOneMovie = async () => {
        try {
            const res = await GetOneMovie(id); // Film ma'lumotlarini olish
            setMovie(res); // Filmni state'ga saqlash
        } catch (err) {
            console.error("Filmni olishda xato:", err);
        } finally {
            setLoading(false); // Loading holatini o'zgartirish
        }
    };

    // **Videolarni olish**
    const getVedio = async () => {
        try {
            const res = await GetAuto(`${APP_API.newSerial}/${id}`); // Video ma'lumotlarini olish
            setVideos(res.data); // Videolarni state'ga saqlash
        } catch (err) {
            console.error("Videolarni olishda xato:", err);
        }
    };

    // **Foydalanuvchi ushbu kinoga like bosganmi yoki yo'q?**
    const getLikeAndMovie = async () => {
        try {
            const storedLike = localStorage.getItem(`like_${id}_${userId}`);
            console.log('Stored like from localStorage:', storedLike); // LocalStorage ma'lumotini ko'rsatish
            if (storedLike !== null) {
                setLiked(JSON.parse(storedLike));
            } else {
                const res = await GetAuto(`${APP_API.likeStatus}/${id}?userId=${userId}`);
                console.log('Server like status:', res.data); // Serverdan olingan like holatini ko'rsatish
                setLiked(res.data);
                localStorage.setItem(`like_${id}_${userId}`, JSON.stringify(res.data));
            }
        } catch (err) {
            console.error("Like holatini tekshirishda xato:", err);
        }
    };


// **Like yoki Unlike qilish funksiyasi**
    const sendLike = async () => {
        try {
            const action = liked ? "unlike" : "like"; // Agar like bo'lsa, unlike qilish
            await BASE_CONFIG_CLIENT.doPost(`${APP_API.likeSendMovie}/${id}/${action}?userId=${userId}`, ''); // Like yoki unlike qilish
            setLiked(prevLiked => {
                const newLikedStatus = !prevLiked; // Yangi like holatini hisoblash
                localStorage.setItem(`like_${id}_${userId}`, JSON.stringify(newLikedStatus)); // LocalStorage'ga yangilangan like holatini saqlash
                return newLikedStatus; // Yangi holatni qaytarish
            });
            getOneMovie(); // Kinoni yangilash
        } catch (err) {
            toast.error("Like bosish uchun ro'yxatdan o'ting");
        }
    };


    // **Ko'rish sonini oshirish**
    const playVideoAndSeeSize = async () => {
        try {
            await BASE_CONFIG.doPost(`${APP_API.movie}/${id}/see-size`); // Ko'rish sonini oshirish
            setMovie(prevMovie => ({...prevMovie, seeSize: prevMovie.seeSize + 0.5})); // Movie'dagi seeSize ni yangilash
        } catch (err) {
            console.error("Ko'rish sonini oshirishda xato:", err);
        }
    };

    useEffect(() => {
        getOneMovie(); // Filmni olish
        getVedio(); // Videolarni olish
        getLikeAndMovie(); // Like holatini tekshirish
    }, [id, userId]);

    return (
        <div>
            <Header/>
            <main>
                <Genre/>
                <div className="overlay"></div>

                <article className="container">
                    <img src="../../assets/images/shape-3.png" className="shape-1 shape-detail" alt="shape"/>
                    <img src="../../assets/images/shape-1.png" className="mob-shape-1 mob-shape-detail-1" alt=""/>
                    <img src="../../assets/images/shape-2.png" className="mob-shape-1 mob-shape-2 mob-shape-detail-2"
                         alt=""/>

                    {loading ? (
                        <Loading/>
                    ) : Object.keys(movie).length > 0 ? (
                        <div className="movie-detail">
                            <div className="backdrop-image"
                                 style={{
                                     backgroundImage: `url('${BASE_URL}${APP_API.downloadImage}${movie.img || ''}')`,
                                     backgroundSize: "cover",
                                     backgroundPosition: "center",
                                 }}>
                            </div>

                            <figure className="poster-box movie-poster">
                                <img src={`${BASE_URL}${APP_API.downloadImage}${movie.img}`} alt={movie.name}
                                     className="img-cover"/>
                            </figure>

                            <div className="detail-box">
                                <div className="detail-content">
                                    <h1 className="heading">{movie.name}</h1>

                                    <div className="meta-list">
                                        <div className="meta-item">
                                            <button onClick={sendLike}>
                                                <i className={`${liked ? 'fa-solid' : 'fa-regular'} fa-heart fa-xl`}
                                                   style={{color: liked ? '#ff0000' : '#fff'}}></i>
                                            </button>
                                            <div></div>
                                            <div></div>
                                            <span className="span">{movie.likeSize}</span>
                                        </div>

                                        <div className="separator"></div>
                                        <div className="meta-item"><i
                                            className="fa-regular fa-hourglass-half"></i> {movie.movieTime}m
                                        </div>
                                        <div className="separator"></div>
                                        <div className="meta-item"><i
                                            className="fa-solid fa-calendar-days"></i> {movie.movieYear}</div>
                                        <div className="separator"></div>
                                        <div
                                            className="meta-item card-badge">{movie.age ? movie.age.substring(1, 3) : ''}+
                                        </div>
                                    </div>

                                    <p className="genre"
                                       style={{color: "wheat"}}>{movie.genres?.slice(0, 8).join(' ')}</p>

                                    <ul className="detail-list">
                                        <div className="list-item"><p className="list-name">Kino Vaqti</p> <p
                                            className="detail-para">{movie.movieTime} m</p></div>
                                        <div className="list-item"><p className="list-name">Kino Yili</p> <p
                                            className="detail-para">{movie.movieYear}</p></div>
                                        <div className="list-item"><p className="list-name">Kino Davlati</p> <p
                                            className="detail-para">{movie.movieCountry}</p></div>
                                        <div className="list-item"><p className="list-name">Kino Tili</p> <p
                                            className="detail-para">{movie.language} tilida</p></div>
                                        <div className="list-item"><p className="list-name">Kino Haqida</p> <p
                                            className="detail-para">{movie.description}</p></div>
                                    </ul>
                                </div>

                                <div className="title-wrapper">
                                    <h3 className="title-large">Kino va Seriallar </h3>
                                </div>

                                <div className="slider-list">
                                    <div className="slider-inner">
                                        <div className="video-card">
                                            <video onPlay={playVideoAndSeeSize} frameBorder="0" ref={videoRef}
                                                   allowFullScreen="1" title="Billion with a B" className="img-cover"
                                                   loading="lazy" width="500" height="294" controls>
                                                <source src={`${BASE_URL}${APP_API.downloadVideo}${movie.video}`}
                                                        type="video/mp4"/>
                                            </video>

                                        </div>
                                        {movie.subCategoryType === "SERIAL" && videos.length > 0 ? (
                                            <>
                                                {videos.map((item, i) => (
                                                    <div className="video-card" style={{position: 'relative'}}>
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                margin: '8px'
                                                            }}>{item.title}</div>
                                                        <video onPlay={playVideoAndSeeSize} ref={videoRef} controls
                                                               width="500"
                                                               height="294">
                                                            <source
                                                                src={`${BASE_URL}${APP_API.downloadVideo}${item.video}`}
                                                                type="video/mp4"/>
                                                        </video>
                                                    </div>

                                                ))}
                                            </>
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Ma'lumot topilmadi</p>
                    )}
                    <RandomMovie/>
                </article>
            </main>
        </div>
    );
};
