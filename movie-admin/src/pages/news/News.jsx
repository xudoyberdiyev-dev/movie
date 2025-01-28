import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {CardHeaders} from "../../companents/CardHeader.jsx";
import {ADMIN_URLS} from "../../utils/URL.js";
import {GetAuto} from "../../connection/service/AppService.js";
import {APP_API} from "../../connection/AppApi.js";
import {AuthBody} from "../../companents/AuthBody.jsx";

export const News = () => {
    const [news, setNews] = useState([])

    const getAll = async () => {
        try {
            const res = await GetAuto(`${APP_API.news}/active`, 'data')
            setNews(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAll()
    }, []);

    return (
        <Grid sx={{width: "100%", margin: "0 auto", padding: "10px"}}>
            <CardHeaders name={"Reklama va Yangliklar ro'yxati"} status={'save'} link={`/${ADMIN_URLS.addNwes}`}/>
            <AuthBody name={"News"} data={news}/>
        </Grid>
    )
}