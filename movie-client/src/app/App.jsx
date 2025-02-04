import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Primary} from "../primary/Primary.jsx";
import {GenreByMovie} from "../genreByMovie/GenreByMovie.jsx";
import {MovieItem} from "../movies/movieItem/MovieItem.jsx";
import {Login} from "../auth/Login.jsx";
import {Register} from "../auth/Register.jsx";
import {Cabinet} from "../auth/cabinet/Cabinet.jsx";
import {PrivateRouter} from "../components/PrivateRouter.jsx";
import {NotFountPage} from "../components/NotFountPage.jsx";

function App() {
    const id = localStorage.getItem("id")
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Primary/>}/>

            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/login"} element={<Login/>}/>

            <Route path={"/cabinet"} element={<PrivateRouter><Cabinet/></PrivateRouter>}/>

            <Route path="/movies/:genre" element={<GenreByMovie/>}/>
            <Route path={"/movie-item/:id"} element={<MovieItem userId={id}/>}/>

            <Route path={"*"} element={<NotFountPage/>}/>
        </Routes>
    </BrowserRouter>)
}

export default App
