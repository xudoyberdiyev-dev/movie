import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Button,
    Typography,
    Box,
    Modal,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActionArea
} from "@mui/material";
import {GetOneMovie} from "../../connection/service/AppService";
import {APP_API} from "../../connection/AppApi";
import {BASE_URL} from "../../connection/BaseUrl";
import {ADMIN_URLS} from "../../utils/URL.js";
import {VideoModal} from "../../companents/ImageModal.jsx";


export const MovieItem = () => {
    const [openVideo, setOpenVideo] = useState(false);
    const [movies, setMovie] = useState({});

    const {id} = useParams();
    const navigate = useNavigate();

    const toggleModalVideo = () => setOpenVideo(!openVideo);


    const getOneMovie = async () => {
        try {
            const movie = await GetOneMovie(id);
            setMovie(movie);
        } catch (err) {
            console.error(err);
        }
    };

    const backMovie = async () => {
        navigate(`/${ADMIN_URLS.movie}`)
    }

    useEffect(() => {
        if (id) getOneMovie();
    }, [id]);
    return (
        <Box sx={{maxWidth: "100%", margin: "auto", mt: 4}}>
            <Typography variant="h4" sx={{mb: 3, textAlign: "center"}}>
                <Card sx={{width: "100%", marginBottom: 1, padding: 0.5}}>
                    <CardContent>
                        <Typography variant="h4" color="primary" textAlign="center">
                            Kino Item
                        </Typography>

                    </CardContent>
                </Card>
            </Typography>

            <Grid style={{display: "flex"}}>
                <Card sx={{maxWidth: 500, height: "70vh"}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="600"
                            image={`${BASE_URL}${APP_API.downloadImage}${movies.img}`}
                            alt="Kino rasmi"
                        />
                    </CardActionArea>
                </Card>

                <Card sx={{minWidth: 500}}>
                    <CardContent>
                        {[
                            {label: "Kino Janri", value: movies.genres},
                            {label: "Kino Turi", value: movies.subCategoryType},
                            {label: "Kino Nomi", value: movies.name},
                            {label: "Kino Davomiligi", value: `${movies.movieTime} min`},
                            {label: "Kino Yili", value: movies.movieYear},
                            {label: "Kino Tili", value: movies.language},
                            {label: "Kino Davlati", value: movies.movieCountry},
                            {label: "Kino haqida", value: movies.description},
                        ].map((item, index) => (
                            <Typography gutterBottom variant="h5" component="div" key={index}>
                                {item.label}: {item.value}
                            </Typography>
                        ))}
                        <Grid sx={{marginTop: "10px"}}>
                            <Button sx={{margin: "2px"}} onClick={toggleModalVideo}>
                                Kinoni korish
                            </Button>
                            <Button color={"error"} onClick={() => backMovie()} sx={{margin: "7px"}}>Orqaga
                                Qaytish</Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <VideoModal description={"Kino Videosi"} videoUrl={`${BASE_URL}${APP_API.downloadVideo}${movies.video}`}
                        open={openVideo} onClose={toggleModalVideo}/>
        </Box>
    );
};
