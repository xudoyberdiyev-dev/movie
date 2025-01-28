import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Button,
    TextField,
    Typography,
    Box,
    Modal,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActionArea, Grid2, CardActions, Pagination
} from "@mui/material";
import toast from "react-hot-toast";
import {UploadFile, AutoSaveAndUpdate, GetOneMovie, GetAuto} from "../../connection/service/AppService";
import {APP_API} from "../../connection/AppApi";
import {BASE_URL} from "../../connection/BaseUrl";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {ADMIN_URLS} from "../../utils/URL.js";
import {CardHeaders} from "../../companents/CardHeader.jsx";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {AuthBody, SeeSerial} from "../../companents/AuthBody.jsx";


const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
const modalStyleVideo = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2.5,
};
export const SerialAdd = () => {
    const [currentPage, setCurrentPage] = useState(1); // boshlang'chi sahifa nechanchida turushi uchun
    const videoPage = 12; //bu narsa har pagega nechtadan kino chiqishi uchun
    const [currentPanel, setCurrentPanel] = useState("panel1"); // Default panel
    const [movies, setMovie] = useState({});
    const [videos, setVideos] = useState([])


    const [open, setOpen] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [formData, setFormData] = useState({title: "", video: null});
    const [errors, setErrors] = useState({title: "", video: ""});

    const {id} = useParams();
    const navigate = useNavigate();

    const toggleModal = () => setOpen(!open);
    const toggleModalVideo = () => setOpenVideo(!openVideo);

    const startIndex = (currentPage - 1) * videoPage;
    const currentMovies = videos.slice(startIndex, startIndex + videoPage);

    // Sahifalar sonini hisoblash
    const totalPages = Math.ceil(videos.length / videoPage);

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const validateData = (name, value) => {
        let error = "";
        if (name === "title" && !value.trim()) error = "Kino nomi bo'lishi shart";
        else if (name === "video" && !value) error = "Kino videosi bo'lishi shart";

        setErrors((prev) => ({...prev, [name]: error}));
    };

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        const fieldValue = files ? files[0] : value;
        setFormData((prev) => ({...prev, [name]: fieldValue}));
        validateData(name, fieldValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.video) {
            toast.error("Barcha maydonlarni to'ldiring!");
            return;
        }

        try {
            const videoUrl = await UploadFile(APP_API.uploadFile, formData.video);
            const payload = {title: formData.title, video: videoUrl};
            const response = await AutoSaveAndUpdate(`${APP_API.addNewSerial}/${id}`, payload, "", navigate, "");
            await getVedos()
            if (response?.data?.success) toast.success("Serial muvaffaqiyatli qo'shildi!");

        } catch (err) {
            console.log(`Xatolik yuz berdi: ${err.message}`)
        }
    };

    const fetchMovieData = async () => {
        try {
            const movie = await GetOneMovie(id);
            setMovie(movie);
            if (movie) setFormData((prev) => ({...prev, title: movie.title || ""}));
        } catch (err) {
            console.error(err);
        }
    };
    const getVedos = async () => {
        try {
            const res = await GetAuto(`${APP_API.newSerial}/${id}`, 'data')
            setVideos(res.data)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        if (id) fetchMovieData();
        getVedos()
    }, [id]);

    return (
        <>
            {currentPanel === "panel1" && (
                <Box sx={{maxWidth: "100%", margin: "auto", mt: 4}}>
                    <Typography variant="h4" sx={{mb: 3, textAlign: "center"}}>
                        <Card sx={{width: "100%", marginBottom: 1, padding: 0.5}}>
                            <CardContent>
                                <Typography variant="h4" color="primary" textAlign="center">
                                    Serallar Qo'shish
                                </Typography>

                            </CardContent>
                        </Card>
                    </Typography>

                    <Grid style={{display: "flex"}}>
                        <Card sx={{maxWidth: 500, height: '70vh'}}>
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
                                    {movies.subCategoryType === "SERIAL" ? (
                                        <Button sx={{margin: "2px"}} onClick={toggleModal}>
                                            Serial qismlarni qo'shish
                                        </Button>
                                    ) : null}
                                    <Button sx={{margin: "2px"}} onClick={toggleModalVideo}>
                                        Kinoni korish
                                    </Button>
                                    <Button onClick={() => setCurrentPanel("panel2")}><RemoveRedEyeIcon/></Button>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                </Box>
            )}
            {currentPanel === "panel2" && (
                <>
                    {videos.length === 0 ? <h1>Hozirda Serial qismlari mavjud emas</h1> :
                        <>
                            <SeeSerial data={currentMovies} movie={movies} deleteFunction={true} ids={id} getAll={getVedos}/>
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


                    }
                </>
            )
            }

            {/*    modal uchun */
            }
            <Modal
                keepMounted
                open={open}
                onClose={toggleModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-title" variant="h6">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Kino nomi"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                error={!!errors.title}
                                helperText={errors.title}
                                sx={{mb: 2}}
                            />
                            <TextField
                                fullWidth
                                type="file"
                                inputProps={{accept: "video/*"}}
                                name="video"
                                onChange={handleChange}
                                error={!!errors.video}
                                helperText={errors.video}
                                sx={{mb: 2}}
                            />
                            <Button type="submit" variant="contained" fullWidth sx={{mb: 1}}>
                                Saqlash
                            </Button>
                            <Button color="error" onClick={toggleModal} fullWidth>
                                Bekor qilish
                            </Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
            <Modal
                keepMounted
                open={openVideo}
                onClose={toggleModalVideo}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyleVideo}>
                    <Typography id="modal-title" variant="h6">
                        <video frameBorder="0"
                               allowFullScreen="1" title="Billion with a B"
                               className="img-cover" loading="lazy"
                               width="100%" height="294" controls>
                            <source src={`${BASE_URL}${APP_API.downloadVideo}${movies.video}`}
                                    type="video/mp4"/>
                            <source src={`${BASE_URL}${APP_API.downloadVideo}${movies.video}`}
                                    type="video/webm"/>
                            <source src={`${BASE_URL}${APP_API.downloadVideo}${movies.video}`}
                                    type="video/ogg"/>
                        </video>
                        <Button color="error" onClick={toggleModalVideo} fullWidth>
                            Bekor qilish
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
        ;
};
