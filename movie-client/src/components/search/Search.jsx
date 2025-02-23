import React, {useState} from "react";
import {GetAuto} from "../../service/userService/AppService.js";
import {APP_API} from "../../service/AppApi.js";
import {FaMicrophone, FaSearch, FaTimes} from "react-icons/fa";
import './search.css'
import {SortBySubCategoryMovie} from "../../sortBySubCategory/SortBySubCategoryMovie.jsx";
import {BASE_URL} from "../../service/BaseUrl.js";
import {useNavigate} from "react-router-dom";

export const Search = ({toggleMenu}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);

    // Ovozli qidiruvni boshlash
    const startVoiceSearch = () => {
        // SpeechRecognition funksiyasini tekshirish
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error('Bu brauzer ovozli qidiruvni qo‘llab-quvvatlamaydi');
            alert('Ovozli qidiruvni qo‘llab-quvvatlovchi brauzerni ishlating');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'uz-UZ';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            setSearchQuery(speechResult);
            performSearch(speechResult);
        };

        recognition.onerror = (event) => {
            console.error('Ovozli qidiruvda xatolik:', event.error);
        };

        recognition.start();
    };


    // Qidiruvni amalga oshirish
    const performSearch = async (query) => {
        if (query.trim() !== '') {
            try {
                const response = await GetAuto(
                    `${APP_API.serachMovie}?query=${query}`
                );

                setMovies(response.data);
            } catch (error) {
                console.error('Qidiruvda xatolik yuz berdi', error);
            }
        } else {
            setMovies([]);
        }
    };

    // Yozma qidiruvni amalga oshirish
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
    };
    const oneMovie = (id) => {
        window.location.reload()
        navigate("/movie-item/" + id);
    };
    return (
        <div>
            <div className="search-container">
                <input value={searchQuery}
                       onChange={handleSearchChange}
                       type="text"
                       name="search"
                       aria-label="search movies"
                       placeholder="Kino nomi bilan qidiring..."
                       autoComplete="off"/>
                <div className="search-btn">
                    <FaSearch className="icon" onClick={() => performSearch(searchQuery)}/>
                </div>
                <div className="mic-btn">
                    <FaMicrophone className="icon" onClick={startVoiceSearch}/>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    margin: "5px",
                    cursor: 'pointer'
                }} onClick={toggleMenu}>
                    <FaTimes size={24} color="white"/>
                </div>
            </div>
            <div className={'search-result'}>
                <section className="movie-list" aria-label="Telegu Movies...">
                    <div className="title-wrapper">
                        <h3 className="title-large">Qidiruv natijasi...</h3>
                    </div>

                    <div className="slider-list">
                        <div className="slider-inner">
                            {movies.map((item) => (
                                <div className="movie-card" key={item.id}>
                                    <figure className="poster-box card-banner" onClick={() => oneMovie(item.id)}>
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
                                    <a href="./detail.html" className="card-btn" title={item.name}></a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>


    );
};
