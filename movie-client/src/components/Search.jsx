import React, {useState} from "react";
import searchIcon from "../assets/images/search.png"; // search rasm
import closeIcon from "../assets/images/close.png";  // close rasm
import {GetAuto} from "../service/userService/AppService.js";
import {APP_API} from "../service/AppApi.js";
import "./search.css";

export const Search = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal holatini boshqarish
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
                setIsModalOpen(true); // Modalni ochish
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

    // Modalni yopish
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="search-box">
            <div className="search-wrapper">
                <input
                    value={searchQuery}
                    onChange={handleSearchChange}
                    type="text"
                    name="search"
                    aria-label="search movies"
                    className="search-field"
                    placeholder="Search any movies..."
                    autoComplete="off"
                />
                <img
                    src={searchIcon}
                    alt="search"
                    width="24"
                    height="24"
                    className="loading-icon"
                />
            </div>
            <button onClick={() => performSearch(searchQuery)}>Qidirish</button>
            <button onClick={startVoiceSearch}>Ovoz bn</button>
            <button className="search-btn">
                <img src={closeIcon} width="24" height="24" alt="close search box"/>
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>X</button>
                        <h2>Natijalar:</h2>
                        {movies.length > 0 ? (
                            <ul>
                                {movies.map((movie) => (
                                    <li key={movie.id}>{movie.title}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Natijalar topilmadi.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
