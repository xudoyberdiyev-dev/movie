import { Header } from "../../components/Header.jsx";
import { Genre } from "../../genre/Genre.jsx";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { GetAuto, GetOneMovie } from "../../service/userService/AppService.js";
import { BASE_URL } from "../../service/BaseUrl.js";
import { APP_API } from "../../service/AppApi.js";
import { Loading } from "../../components/Loading.jsx";
import { RandomMovie } from "../randomMovie/RandomMovie.jsx";
import { BASE_CONFIG_CLIENT, BASE_CONFIG } from "../../service/BaseConfig.js";
import toast from "react-hot-toast";

export const MovieItem = ({ userId }) => {
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const [videos, setVideos] = useState([]);
    const { id } = useParams();
    const videoRef = useRef(null);

    useEffect(() => {
        fetchMovie();
        fetchVideos();
        checkLikeStatus();
    }, [id]);

    // **Bitta filmni olish**
    const fetchMovie = async () => {
        try {
            const res = await GetOneMovie(id);
            setMovie(res);
        } catch (err) {
            console.error("Error fetching movie:", err);
        } finally {
            setLoading(false);
        }
    };

    // **Videolarni olish**
    const fetchVideos = async () => {
        try {
            const res = await GetAuto(`${APP_API.newSerial}/${id}`);
            setVideos(res.data);
        } catch (err) {
            console.error("Error fetching videos:", err);
        }
    };

    // **Foydalanuvchi ushbu kinoga like bosganmi yoki yoʻq?**
    const checkLikeStatus = async () => {
        try {
            const res = await GetAuto(`${APP_API.likeStatus}/${id}?userId=${userId}`);
            setLiked(res.data);
        } catch (err) {
            console.error("Error fetching like status:", err);
        }
    };

    // **Like yoki Unlike qilish**
    const handleLike = async () => {
        try {
            const action = liked ? "unlike" : "like";
            await BASE_CONFIG_CLIENT.doPost(`${APP_API.likeSendMovie}/${id}/${action}?userId=${userId}`, '');
            setLiked(!liked);
            fetchMovie();
        } catch (err) {
            toast.error("Like bosish uchun royxatdan oting");
        }
    };

    // **Koʻrish sonini oshirish**
    const handleVideoPlay = async () => {
        try {
            await BASE_CONFIG.doPost(`${APP_API.movie}/${id}/see-size`);
            setMovie(prevMovie => ({ ...prevMovie, seeSize: prevMovie.seeSize + 0.5 }));
        } catch (err) {
            console.error("Error updating seeSize:", err);
        }
    };

    return (
        <div>
            <Header />
            <main>
                <Genre />
                <div className="overlay"></div>

                <article className="container">
                    <img src="../../assets/images/shape-3.png" className="shape-1 shape-detail" alt="shape" />
                    <img src="../../assets/images/shape-1.png" className="mob-shape-1 mob-shape-detail-1" alt="" />
                    <img src="../../assets/images/shape-2.png" className="mob-shape-1 mob-shape-2 mob-shape-detail-2" alt="" />

                    {loading ? (
                        <Loading />
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
                                <img src={`${BASE_URL}${APP_API.downloadImage}${movie.img}`} alt={movie.name} className="img-cover"/>
                            </figure>

                            <div className="detail-box">
                                <div className="detail-content">
                                    <h1 className="heading">{movie.name}</h1>

                                    <div className="meta-list">
                                        <div className="meta-item">
                                            <button onClick={handleLike}>
                                                <i className={`${liked ? 'fa-solid' : 'fa-regular'} fa-heart fa-xl`}
                                                   style={{ color: liked ? '#ff0000' : '#fff' }}></i>
                                            </button>
                                            <span className="span">{movie.likeSize}</span>
                                        </div>

                                        <div className="separator"></div>
                                        <div className="meta-item"><i className="fa-regular fa-hourglass-half"></i> {movie.movieTime}m</div>
                                        <div className="separator"></div>
                                        <div className="meta-item"><i className="fa-solid fa-calendar-days"></i> {movie.movieYear}</div>
                                        <div className="separator"></div>
                                        <div className="meta-item card-badge">{movie.age ? movie.age.substring(1, 3) : ''}+</div>
                                    </div>

                                    <p className="genre" style={{ color: "wheat" }}>{movie.genres?.slice(0, 8).join(' ')}</p>

                                    <ul className="detail-list">
                                        <div className="list-item"><p className="list-name">Kino Vaqti</p> <p className="detail-para">{movie.movieTime} m</p></div>
                                        <div className="list-item"><p className="list-name">Kino Yili</p> <p className="detail-para">{movie.movieYear}</p></div>
                                        <div className="list-item"><p className="list-name">Kino Davlati</p> <p className="detail-para">{movie.movieCountry}</p></div>
                                        <div className="list-item"><p className="list-name">Kino Tili</p> <p className="detail-para">{movie.language} tilida</p></div>
                                        <div className="list-item"><p className="list-name">Kino Haqida</p> <p className="detail-para">{movie.description}</p></div>
                                    </ul>
                                </div>

                                <div className="slider-list">
                                    {movie.subCategoryType === "SERIAL" && videos.length > 0 && videos.map((item) => (
                                        <div key={item.id} className="video-card">
                                            <video onPlay={handleVideoPlay} ref={videoRef} controls width="294" height="294">
                                                <source src={`${BASE_URL}${APP_API.downloadVideo}${item.video}`} type="video/mp4"/>
                                            </video>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Ma'lumot topilmadi</p>
                    )}
                    <RandomMovie />
                </article>
            </main>
        </div>
    );
};
