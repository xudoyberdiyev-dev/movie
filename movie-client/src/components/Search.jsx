import React, {useState} from "react";
import searchIcon from "../assets/images/search.png"; // search rasm
import closeIcon from "../assets/images/close.png";  // close rasm
import {GetAuto} from "../service/userService/AppService.js";
import {APP_API} from "../service/AppApi.js";
import {FaMicrophone, FaSearch} from "react-icons/fa";
import './search.css'

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
                {movies.map((item)=>(
                    <div>{item.name}</div>
                ))}
                {/*<button onClick={() => setIsModalOpen(true)}>d</button>*/}
            </div>
        </div>


    );
};
