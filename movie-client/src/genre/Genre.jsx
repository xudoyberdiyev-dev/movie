import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import '../components/navbar/navbar.css'
export const Genre = () => {
    const [genres, setGenres] = useState([]);
    const getGenres = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/genres')
            setGenres(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getGenres();
    }, []);

    return (
        <div>
            <nav className="sidebar" sidebar="">
                <div className="sidebar-inner">
                    <div className="sidebar-list">
                        <p className="title">Janrlar</p>
                        <Link to={"/"}>Bosh Sahifa</Link>
                        {genres.map((item, i) => (
                            <Link
                                to={`/movies/${item}`} // URL'ga janr nomini qo'shish
                                key={i}
                                className="sidebar-link"
                            >
                                {item} {/* Har bir janr nomini ko'rsatish */}
                            </Link>
                        ))}
                    </div>

                    <div className="sidebar-list">

                        <p className="title">Language</p>

                        <a href="./movie-list.html"
                           onClick="getMovieList(&quot;with_original_language=en&quot;, &quot;English&quot;)"
                           className="sidebar-link" menu-close="">English</a>

                        <a href="./movie-list.html"
                           onClick="getMovieList(&quot;with_original_language=hi&quot;, &quot;Hindi&quot;)"
                           className="sidebar-link"
                           menu-close="">Hindi</a>

                        <a href="./movie-list.html"
                           onClick="getMovieList(&quot;with_original_language=te&quot;, &quot;Telugu&quot;)"
                           className="sidebar-link" menu-close="">Telugu</a>

                        <a href="./movie-list.html"
                           onClick="getMovieList(&quot;with_original_language=ta&quot;, &quot;Tamil&quot;)"
                           className="sidebar-link"
                           menu-close="">Tamil</a>

                        <a href="./movie-list.html"
                           onClick="getMovieList(&quot;with_original_language=ja&quot;, &quot;Japanese&quot;)"
                           className="sidebar-link" menu-close="">Japanese</a>

                        <a href="./movie-list.html"
                           onClick="getMovieList(&quot;with_original_language=pa&quot;, &quot;Punjabi&quot;)"
                           className="sidebar-link" menu-close="">Punjabi</a>

                        <a href="./movie-list.html"
                           onClick="getMovieList(&quot;with_original_language=bn&quot;, &quot;Bengali&quot;)"
                           className="sidebar-link" menu-close="">Bengali</a>


                    </div>

                    <div className="sidebar-footer">
                        <p className="copyright">
                            Made By <i className="fa-solid fa-copyright"></i> PRAKHAR-KATIYAR
                            <a href="https://github.com/Prakhar-002">
                                <i className="fa-brands fa-github"></i> Prakhar-002
                            </a>
                        </p>

                    </div>
                    <button style={{}} className={'btn-tg'}>Telegram kanal</button>
                </div>
            </nav>
        </div>
    )
}

