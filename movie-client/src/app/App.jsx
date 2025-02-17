import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Primary} from "../primary/Primary.jsx";
import {GenreByMovie} from "../genre/genreByMovie/GenreByMovie.jsx";
import {MovieItem} from "../movies/movieItem/MovieItem.jsx";
import {Login} from "../auth/login/Login.jsx";
import {Register} from "../auth/register/Register.jsx";
import {Profile} from "../cabinetLayout/profile/Profile.jsx";
import {PrivateRouter} from "../components/privateRouter/PrivateRouter.jsx";
import {NotFountPage} from "../components/notfount/NotFountPage.jsx";
import {CabinetLayout} from "../cabinetLayout/cabinet/CabinetLayout.jsx";
import {News} from "../cabinetLayout/news/News.jsx";
import {Complaint} from "../cabinetLayout/complaint/Complaint.jsx";
import {Sevimli} from "../cabinetLayout/sevimli/Sevimli.jsx";

function App() {
    const id = localStorage.getItem("id")
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Primary/>}/>

            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/login"} element={<Login/>}/>

            <Route path={"/cabinet"} element={
                <PrivateRouter>
                    <CabinetLayout/>
                </PrivateRouter>
            }>
                <Route index element={<Profile/>}/>
                <Route path={'/cabinet/news'} element={<News/>}/>
                <Route path={'/cabinet/complaint'} element={<Complaint/>}/>
                <Route path={'/cabinet/liked'} element={<Sevimli/>}/>
            </Route>

            <Route path="/movies/:genre" element={<GenreByMovie/>}/>
            <Route path={"/movie-item/:id"} element={<MovieItem userId={id}/>}/>

            <Route path={"*"} element={<NotFountPage/>}/>
        </Routes>
    </BrowserRouter>)
}

export default App
