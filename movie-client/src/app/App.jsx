import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Primary} from "../primary/Primary.jsx";
import {GenreByMovie} from "../genreByMovie/GenreByMovie.jsx";
import {MovieItem} from "../movies/movieItem/MovieItem.jsx";
import {Login} from "../auth/Login.jsx";
import {Register} from "../auth/Register.jsx";
import {Cabinet} from "../auth/cabinet/Cabinet.jsx";

function App() {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Primary/>}/>
            <Route path="/movies/:genre" element={<GenreByMovie/>}/>
            <Route path={"/movie-item/:id"} element={<MovieItem/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/cabinet"} element={<Cabinet/>}/>
        </Routes>
        {/*<Footer/>*/}

    </BrowserRouter>)
}

export default App
