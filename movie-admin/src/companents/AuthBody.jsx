import Grid from "@mui/material/Grid";
import {Box, Button, Card, CardActions, CardContent, Fade, Modal, TextField, Typography} from "@mui/material";
import {BASE_URL} from "../connection/BaseUrl.js";
import toast from "react-hot-toast";
import React, {useEffect, useState} from "react";
import {ADMIN_URLS} from "../utils/URL.js";
import {useNavigate} from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {APP_API} from "../connection/AppApi.js";
import {DeleteAuto, DeleteAutoParam, updatePermyera} from "../connection/service/AppService.js";
import {CardHeaders} from "./CardHeader.jsx";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {ImageModal} from "./ImageModal.jsx";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";


export const AuthBody = ({name, data, isSerial, deleteFunction, getAll}) => (

    <Grid container spacing={4} sx={{marginY: 3}}>
        {name === "Movie" ? (
            <MovieBody data={data} isSerial={isSerial} getAll={getAll} deleteFunction={deleteFunction}/>
        ) : name === "NewMovie" ? (
            <NewMovieBody data={data}/>
        ) : name === "SeeSerial" ? (
            <SeeSerial data={data} deleteFunction={deleteFunction} movie={true}/>
        ) : name === "News" ? (
            <GetAllNews data={data} getAll={getAll}/>
        ) : name === "Complaint" ? (
            <GetAllComplaint data={data} getAll={getAll}/>
        ) : null}
    </Grid>
);

// MovieBody komponenti (Serial va Non-Serial filmlar)
const MovieBody = ({data, isSerial, getAll}) => {
    const navigate = useNavigate();

    // Filmlarni bo'limga qarab ajratish
    const serial = data.filter((item) => item.subCategoryType === "SERIAL");
    const noSerial = data.filter((item) => item.subCategoryType !== "SERIAL");
    const allMovies = isSerial ? serial : noSerial;

    const [activeStates, setActiveStates] = useState({});


    // Har bir filmning boshlang'ich `active` qiymatini yuklash
    useEffect(() => {
        const initialStates = {};
        data.forEach((movie) => {
            initialStates[movie.id] = movie.active || false;
        });
        setActiveStates(initialStates);
    }, [data]);

    // Premyera holatini almashtirish funksiyasi
    const togglePremyera = async (id) => {
        try {
            const newState = !activeStates[id];
            await updatePermyera(id, newState); // Backendga so'rov yuborish
            setActiveStates((prev) => ({...prev, [id]: newState})); // Holatni yangilash
            toast[newState ? "success" : "error"](
                `Kino ${newState ? "qo'shildi" : "olib tashlandi"}`
            );
        } catch (error) {
            console.error(error);
            toast.error("Xatolik yuz berdi!");
        }
    };

    // Serial va boshqa filmlar uchun alohida navigatsiya
    const navigateToMovie = (id) => navigate(`/${ADMIN_URLS.serialMovie}/${id}`);
    const navigateToMoviees = (id) => navigate(`/${ADMIN_URLS.movie}/${id}`);


    const deleteFunction = async (id) => {
        try {
            const confirm = window.confirm("O'chirishni hohlaysizmi?")
            if (confirm) {
                await DeleteAuto(APP_API.movie, id, 'data', getAll)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Filmlarni UI-da ko'rsatish
    return allMovies.map((movie) => {
        const imageUrl = movie.photo
            ? `${BASE_URL}${APP_API.downloadImage}${movie.photo}`
            : "Rasm mavjud emas";
        const isActive = activeStates[movie.id] || false;

        return (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <Card sx={{maxWidth: 350}}>
                    <img
                        width="100%"
                        height="200px"
                        src={imageUrl}
                        alt={movie.name}
                        style={{objectFit: "cover"}}
                    />
                    <CardContent>
                        <Typography variant="h6">Kino nomi: {movie.name}</Typography>
                        <Typography sx={{color: "text.secondary"}}>
                            Kino Bo'limi: {movie.subCategoryType}
                        </Typography>
                        <Button
                            fullWidth
                            sx={{my: 1}}
                            color={isActive ? "error" : "primary"}
                            onClick={() => togglePremyera(movie.id)}
                        >
                            {isActive
                                ? "Premyeralar oynasidan olish"
                                : "Premyeralar oynasiga qo'shish"}
                        </Button>
                        <Grid container sx={{
                            width: "105%",
                            marginTop: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }} spacing={1}>
                            <Button sx={{width: "29%"}}
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        movie.subCategoryType === "SERIAL"
                                            ? navigateToMovie(movie.id)
                                            : navigateToMoviees(movie.id)
                                    }
                            >
                                {movie.subCategoryType === "SERIAL" ? (
                                    <AddCircleOutlineIcon/>
                                ) : (
                                    <RemoveRedEyeIcon/>
                                )}
                            </Button>
                            <Button sx={{width: "29%"}}
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => navigate(`/${ADMIN_URLS.addMovie}/${movie.id}`)}
                            >
                                <EditIcon/>
                            </Button>
                            <Button sx={{width: "29%"}}
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => deleteFunction(movie.id)}
                            >
                                <DeleteForeverIcon/>
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        );
    });
};

// NewMovieBody komponenti (Yangi filmlar uchun)
const NewMovieBody = ({data}) => {
    const [activeStates, setActiveStates] = useState({});

    // Har bir filmning boshlang'ich `active` qiymatini yuklash
    useEffect(() => {
        const initialStates = {};
        data.forEach((movie) => {
            initialStates[movie.id] = movie.active || false;
        });
        setActiveStates(initialStates);
    }, [data]);

    // Premyera holatini almashtirish funksiyasi
    const togglePremyera = async (id) => {
        try {
            const newState = !activeStates[id];
            await updatePermyera(id, newState); // Backendga so'rov yuborish
            setActiveStates((prev) => ({...prev, [id]: newState})); // Holatni yangilash
            toast[newState ? "success" : "error"](
                `Kino ${newState ? "qo'shildi" : "olib tashlandi"}`
            );
        } catch (error) {
            console.error(error);
            toast.error("Xatolik yuz berdi!");
        }
    };

    // Filmlarni UI-da ko'rsatish
    return data.map((movie) => {
        const imageUrl = movie.img
            ? `${BASE_URL}${APP_API.downloadImage}${movie.img}`
            : "Rasm mavjud emas";

        const isActive = activeStates[movie.id] || false;

        return (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <Card sx={{maxWidth: 350}}>
                    <img
                        width="100%"
                        height="200px"
                        src={imageUrl}
                        alt={movie.name}
                        style={{objectFit: "cover"}}
                    />
                    <CardContent>
                        <Typography variant="h6">Kino nomi: {movie.name}</Typography>
                        <Typography sx={{color: "text.secondary"}}>
                            Kino Bo'limi: {movie.subCategoryType}
                        </Typography>
                        <Button
                            fullWidth
                            color={isActive ? "error" : "primary"}
                            onClick={() => togglePremyera(movie.id)}
                        >
                            {isActive
                                ? "Premyeralar oynasidan olish"
                                : "Premyeralar oynasiga qo'shish"}
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        );
    });
};
export const SeeSerial = ({data, movie, getAll, ids}) => {
    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const deleteFunction = async (id) => {
        try {
            const confirm = window.confirm("O'chirishni hohlaysizmi?")
            if (confirm) {
                await DeleteAutoParam(`${APP_API.deleteSerial}/${ids}?videoId=`, id, 'data', getAll)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CardHeaders name={"Seriallar Ro'yxati"} status={"back"}/>
            </Grid>
            {data.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card sx={{maxWidth: 345, mt: 4}}>
                        <img
                            width="100%"
                            height="200px"
                            src={`${BASE_URL}${APP_API.downloadImage}${movie.img}`}
                            alt={item.title}
                            style={{objectFit: "cover"}}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.title}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                            <Button
                                sx={{width: "29%"}}
                                variant="outlined"
                                color="primary"
                                onClick={handleOpen}
                            >
                                <RemoveRedEyeIcon/>
                            </Button>
                            <Button sx={{width: "29%"}} variant="outlined" color="primary">
                                <EditIcon/>
                            </Button>
                            <Button
                                sx={{width: "29%"}}
                                variant="outlined"
                                color="primary"
                                onClick={() => deleteFunction(item.id)}
                            >
                                <DeleteForeverIcon/>
                            </Button>
                        </CardActions>
                    </Card>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <video
                                    frameBorder="0"
                                    allowFullScreen="1"
                                    title="Billion with a B"
                                    className="img-cover"
                                    loading="lazy"
                                    width="100%"
                                    height="294"
                                    controls
                                >
                                    <source
                                        src={`${BASE_URL}${APP_API.downloadVideo}${item.video}`}
                                        type="video/mp4"
                                    />
                                    <source
                                        src={`${BASE_URL}${APP_API.downloadVideo}${item.video}`}
                                        type="video/webm"
                                    />
                                    <source
                                        src={`${BASE_URL}${APP_API.downloadVideo}${item.video}`}
                                        type="video/ogg"
                                    />
                                </video>
                                <Button color={"error"} fullWidth onClick={handleClose}>
                                    Bekor qilish
                                </Button>
                            </Box>
                        </Fade>
                    </Modal>
                </Grid>
            ))}
        </Grid>
    )
}

export const GetAllNews = ({data, getAll}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteFunction = async (id) => {
        try {
            const confirm = window.confirm("O'chirishni hohlaysizmi?")
            if (confirm) {
                await DeleteAuto(APP_API.news, id, 'data', getAll)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Grid item xs={12}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>T/r</TableCell>
                            <TableCell align="left">Nomi</TableCell>
                            <TableCell align="center"
                                       colSpan={3}>Sozlamalar</TableCell> {/* Ikonlar uchun joy ochamiz */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, i) => (
                            <TableRow key={item.id} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell align="left">{item.name}</TableCell>
                                <TableCell align="center" colSpan={3}>
                                    <div style={{display: "flex", justifyContent: "center", gap: "30px"}}>
                                        <Button onClick={() => handleOpen()}><RemoveRedEyeIcon/></Button>
                                        <Button onClick={() => deleteFunction(item.id)}><DeleteForeverIcon/></Button>
                                    </div>
                                </TableCell>
                                <ImageModal open={open} onClose={handleClose}
                                            imageUrl={`${BASE_URL}${APP_API.downloadImage}${item.img}`}
                                            description={"Bu reklamani rasmi yoki videosi"}/>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export const GetAllComplaint = ({data, getAll}) => {
    const deleteFunction = async (id) => {
        try {
            const confirm = window.confirm("O'chirishni hohlaysizmi?")
            if (confirm) {
                await DeleteAuto(APP_API.complaint, id, 'data', getAll)
                console.log(id)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Grid container sx={{
            width: "100%",
            maxWidth: 1310,
            margin: "0 auto",
            marginLeft: "22px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px"
        }}>
            {data.map((item, i) => (
                <Card key={i} sx={{width: "100%", borderRadius: "10px", boxShadow: 2}}>
                    <CardHeader
                        avatar={<Avatar sx={{bgcolor: red[600]}}>{item.userName.charAt(0)}</Avatar>}
                        action={
                            <IconButton aria-label="delete">
                                <DeleteForeverIcon onClick={() => deleteFunction(item.id)}/>
                            </IconButton>
                        }
                        title={`${item.userName} ${item.userSurname}`}
                        subheader={`${item.createdAt.substring(0, 10)}`}
                    />
                    <CardContent>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            {item.message}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Grid>
    )
}
