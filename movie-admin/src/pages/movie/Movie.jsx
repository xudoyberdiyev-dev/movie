import Grid from "@mui/material/Grid";
import {CardHeaders} from "../../companents/CardHeader.jsx";
import {ADMIN_URLS} from "../../utils/URL.js";
import {useEffect, useState} from "react";
import {GetAuto} from "../../connection/service/AppService.js";
import {APP_API} from "../../connection/AppApi.js";
import {AuthBody} from "../../companents/AuthBody.jsx";
import {Card, Pagination} from "@mui/material";

export const Movie = () => {
    const [movie, setMovie] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // boshlang'chi sahifa nechanchida turushi uchun
    const moviesPerPage = 6; //bu narsa har pagega nechtadan kino chiqishi uchun

    const getAll = async () => {
        try {
            const res = await GetAuto(APP_API.getMovie, "data");
            setMovie(res.data.reverse());
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    // Sahifalash uchun ma'lumotlarni bo‘laklash
    const startIndex = (currentPage - 1) * moviesPerPage;
    const currentMovies = movie.slice(startIndex, startIndex + moviesPerPage);

    // Sahifalar sonini hisoblash
    const totalPages = Math.ceil(movie.length / moviesPerPage);

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Grid sx={{width: "100%", margin: "0 auto", padding: "10px"}}>
            <CardHeaders name={"Kinolar ro'yxati "} status={"save"} link={`/${ADMIN_URLS.addMovie}`}/>
            <AuthBody
                name={"Movie"}
                item={null}
                deleteMovie={true}
                getAll={getAll}
                update={null}
                data={currentMovies} // Faqat hozir turgan sahifamizdagi kino chiqadi
                isSerial={false}
            />
            {movie.length !== 0 ? <Card sx={{width: "100%", margin: "20px auto", padding: "14px", textAlign: "center"}}>
                <Pagination
                    count={totalPages} // Umumiy sahifalar soni
                    page={currentPage} // Hozirgi sahifa
                    onChange={handlePageChange} // Sahifa almashishi
                    color="primary"
                    sx={{display: "inline-block"}}
                    siblingCount={1} // Hozirgi sahifadan oldin/so‘nggi qo‘shni sahifalar soni
                    boundaryCount={2} // Boshlang'ich va oxirgi sahifalar soni
                />
            </Card> : <></>}
        </Grid>
    );
};
