import * as React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "../layout/DashboardLayouts.jsx";
import {Dashboard} from "../pages/Dashboard.jsx";
import {ADMIN_URLS} from "../utils/URL.js";
import {Movie} from "../pages/movie/Movie.jsx";
import {AddMovie} from "../pages/movie/AddMovie.jsx";
import {NewMovie} from "../pages/newMovie/NewMovie.jsx";
import {Login} from "../pages/auth/Login.jsx";
import {Settings} from "../pages/settings/Settings.jsx";
import {NotFountPage} from "../companents/NotFountPage.jsx";
import {Serial} from "../pages/serail/Serial.jsx";
import {SerialAdd} from "../pages/serail/SerialAdd.jsx";
import {MovieItem} from "../pages/movie/MovieItem.jsx";
import {News} from "../pages/news/News.jsx";
import {Complaint} from "../pages/complaint/Complaint.jsx";
import {Profile} from "../pages/profile/Profile.jsx";
import {AddNews} from "../pages/news/AddNews.jsx";


function App() {
    return (<BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route path={`/dashboard`} element={<Layout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path={`/${ADMIN_URLS.movie}`} element={<Movie/>}/>
                <Route path={`/${ADMIN_URLS.movie}/:id`} element={<MovieItem/>}/>
                <Route path={`/${ADMIN_URLS.addMovie}/:id`} element={<AddMovie/>}/>
                <Route path={`/${ADMIN_URLS.newMovie}`} element={<NewMovie/>}/>
                <Route path={`/${ADMIN_URLS.serialMovie}`} element={<Serial/>}/>
                <Route path={`/${ADMIN_URLS.serialMovie}/:id`} element={<SerialAdd/>}/>
                <Route path={`/${ADMIN_URLS.addMovie}`} element={<AddMovie/>}/>
                <Route path={`/${ADMIN_URLS.newMovie}`} element={<NewMovie/>}/>
                <Route path={`/${ADMIN_URLS.news}`} element={<News/>}/>
                <Route path={`/${ADMIN_URLS.addNwes}`} element={<AddNews/>}/>
                <Route path={`/${ADMIN_URLS.complaint}`} element={<Complaint/>}/>
                <Route path={`/${ADMIN_URLS.profile}`} element={<Profile/>}/>
                <Route path={`/${ADMIN_URLS.settings}`} element={<Settings/>}/>
            </Route>
            <Route path={"*"} element={<NotFountPage/>}/>
        </Routes>
    </BrowserRouter>);
}


export default App;
