import {useEffect, useState} from "react";
import {GetAuto} from "../service/userService/AppService.js";
import {APP_API} from "../service/AppApi.js";
import {BASE_URL} from "../service/BaseUrl.js";

export const SectionControl = () => {
    const [movie, setMovie] = useState([])

    const getAll = async () => {
        try {
            const res = await GetAuto(APP_API.getPremyeraMovie, 'data')
            setMovie(res.data)
            console.log("dada"+res)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAll()
    }, []);
    return (
        <div className="slider-control">
            <div className="control-inner">
                {movie.map((item)=> (
                    <button className="poster-box slider-item active" slider-control="2">
                        <img src={`${BASE_URL}${APP_API.downloadImage}${item.img}`} loading="lazy"
                             className="img-cover img-zoom" alt="Inside" out="" draggable="false"/>
                    </button>
                ))}
            </div>
        </div>
    )
}