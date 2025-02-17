import {BASE_URL} from "../service/BaseUrl.js";
import {APP_API} from "../service/AppApi.js";
import {useNavigate} from "react-router-dom";

export const SortBySubCategoryMovie = ({name, data, isMovie}) => {


    const renderMovies = (category) => {
        return (
            <MovieList data={data} category={category} isMovie={isMovie}/>
        );
    };
    switch (name) {
        case "PREMYERA":
            return renderMovies("PREMYERA");
        case "HIND":
            return renderMovies("HIND");
        case "UZB":
            return renderMovies("UZB");
        case "MULTFILM":
            return renderMovies("MULTFILM");
        case "ANIME":
            return renderMovies("ANIME");
        case "RETRO":
            return renderMovies("RETRO");
        default:
            return renderMovies("SERIAL");
    }

}
const MovieList = ({data, category, isMovie}) => {
    const formatNumber = (num) => { // prasmotr uchun 1000 dan oshib ketsa k yoki M da chiqaradi 1.5k
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M"; // 1.5M
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "k"; // 1.5k
        }
        return num; // Agar 1000 dan kam bo‘lsa, oddiy holatda qaytariladi
    };
    const navigate = useNavigate();
    const oneMovie = (id) => {
        navigate("/movie-item/" + id);
    };

    const filteredMovies = data.filter(item => item.subCategoryType === category);
    const moviesToShow = isMovie ? filteredMovies : [];

    return (
        <>
            {moviesToShow.map((item) => (
                <div className="movie-card" key={item.id}>
                    <figure className="poster-box card-banner" onClick={() => oneMovie(item.id)}>
                        <a>
                            <img
                                src={`${BASE_URL}${APP_API.downloadImage}${item.photo}`}
                                alt={item.name}
                                className="img-cover img-zoom"
                                loading="lazy"
                            />
                        </a>
                    </figure>

                    <h4 className="title">{item.name}</h4>

                    <div className="meta-list">
                        <div className="meta-item">
                            <span className="span">{formatNumber(Math.ceil(item.seeSize))}</span>
                        </div>
                        <div className="card-badge">{item.age.substring(1, 3)}+</div>
                    </div>

                    <a href="./detail.html" className="card-btn" title={item.name}></a>
                </div>
            ))}
        </>
    );
};

