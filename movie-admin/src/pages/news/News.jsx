import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {CardHeaders} from "../../companents/CardHeader.jsx";
import {ADMIN_URLS} from "../../utils/URL.js";
import {GetAuto} from "../../connection/service/AppService.js";
import {APP_API} from "../../connection/AppApi.js";
import {AuthBody} from "../../companents/AuthBody.jsx";
import {Pagination} from "@mui/material";
import {Loading} from "../../companents/Loading.jsx";

export const News = () => {
    const [news, setNews] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // boshlang'chi sahifa nechanchida turushi uchun
    const newsPerPage = 10; //bu narsa har pagega nechtadan kino chiqishi uchun


    const getAll = async () => {
        try {
            const res = await GetAuto(`${APP_API.news}/active`, 'data')
            setNews(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const startIndex = (currentPage - 1) * newsPerPage;
    const currentNews = news.slice(startIndex, startIndex + newsPerPage);

    // Sahifalar sonini hisoblash
    const totalPages = Math.ceil(news.length / newsPerPage);

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        getAll()
    }, []);

    return (
        <Grid sx={{width: "100%", margin: "0 auto", padding: "10px"}}>
            <CardHeaders name={"Reklama va Yangliklar ro'yxati"} status={'save'} link={`/${ADMIN_URLS.addNwes}`}/>
            {news.length !== 0 ? (
                <>
                    <AuthBody name={"News"} data={currentNews} deleteFunction={true} getAll={getAll}/>

                    <Pagination
                        count={totalPages} // Umumiy sahifalar soni
                        page={currentPage} // Hozirgi sahifa
                        onChange={handlePageChange} // Sahifa almashishi
                        color="primary"
                        sx={{display: "inline-block"}}
                        siblingCount={1} // Hozirgi sahifadan oldin/so‘nggi qo‘shni sahifalar soni
                        boundaryCount={2} // Boshlang'ich va oxirgi sahifalar soni
                    />
                </>
            ) : (
                <Loading/>
            )}
        </Grid>
    )
}