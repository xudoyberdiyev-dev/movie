import {useEffect, useState} from "react";
import {GetAuto} from "./userService/AppService.js";
import {APP_API} from "./AppApi.js";

export const getAllMovie = () => {
    const [movie, setMovie] = useState([]);

    const getAll = async () => {
        try {
            const res = await GetAuto(APP_API.getMovie, 'data');
            setMovie(res.data.reverse().slice(0, 10));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getAll();
    }, []);

    return movie;
};
