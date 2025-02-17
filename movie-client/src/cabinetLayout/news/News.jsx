import {useEffect, useState} from "react";
import {GetAuto} from "../../service/userService/AppService.js";
import {APP_API} from "../../service/AppApi.js";
import {Loading} from "../../components/loading/Loading.jsx";

export const News = () => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(false)

    const getAllNews = async () => {
        const res = await GetAuto(APP_API.getAllNews, 'data')
        setNews(res.data)
        console.log(res.data)
        setLoading(true)
    }

    useEffect(() => {
        getAllNews()
    }, []);
    return (
        loading ? (
            <div>
                <div>
                    {news.map((item)=>(
                        <div>{item.name}</div>
                    ))}
                </div>
            </div>
        ) : (
            <Loading/>
        )
    )
}