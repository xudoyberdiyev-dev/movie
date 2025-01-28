import Grid from "@mui/material/Grid";
import {CardHeaders} from "../../companents/CardHeader.jsx";
import {ADMIN_URLS} from "../../utils/URL.js";
import {AutoForm} from "../../companents/AutoForm.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AutoSaveAndUpdate, DeleteAuto, GetAuto, UploadFile} from "../../connection/service/AppService.js";
import {APP_API} from "../../connection/AppApi.js";
import toast from "react-hot-toast";

export const AddMovie = () => {
    const id = useParams().id
    const navigate = useNavigate()
    const [seeImg, setSeeImg] = useState(null);

    const [movie, setMovie] = useState({})


    const getAll = async () => {
        try {
            const res = await GetAuto(`${APP_API.movie}/${id}`)
            const newData = {
                name: res.data.name,
                genres: res.data.genres || [],
                subCategoryType: res.data.subCategoryType || '',
                language: res.data.language,
                movieTime: res.data.movieTime,
                movieCountry: res.data.movieCountry,
                movieYear: res.data.movieYear,
                botId: res.data.botId,
                description: res.data.description,
                age: res.data.age,
                img: res.data.img,
                video: res.data.video,
            }
            setMovie(res.data)
            setFormData(newData)
        } catch (err) {
        }
    }
    if (id) {
        useEffect(() => {
            getAll()
        }, []);
    }


    const [formData, setFormData] = useState({
        name: '',
        description: '',
        genres: [],
        subCategoryType: '',
        age: '',
        genre: [],
        subCategory: '',
        movieTime: 0,
        language: '',
        movieYear: 0,
        movieCountry: '',
        botId: 0,
        img: null,
        video: null,
    });
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        genre: '',
        subCategory: '',
        movieTime: '',
        language: '',
        movieYear: '',
        movieCountry: '',
        botId: '',
        img: '',
        age: '',
        video: ''
    });


    const validateData = (name, value) => {
        let err = ''
        switch (name) {
            case 'name':
                if (!value.trim()) err = "Kino nomi bolishi shart";
                break;
            case 'img':
                if (!value) err = "Kino rasmi bo'lishi shart"
                break;
            case 'video':
                if (!value) err = "Kino Vidyosi bo'lishi shary";
                break;
            case 'subCategoryType':
                if (!value) err = "Kino Turini tanlang";
                break;
            case 'genres':
                if (!value) err = "Kino Janri bo'lishi shart";
                break;
            case 'movieTime':
                if (value <= 0) err = "Kino umumiy vaqtini kiritng";
                break;
            case 'language':
                if (!value.trim()) err = "Kino qaysi tilda ekanligini kiritng";
                break;
            case 'movieYear':
                if (!value <= 0) err = "Kino yilini kiriting";
                break;
            case 'movieCountry':
                if (!value.trim()) err = "Kino ishlangan davlatni kiritng";
                break;
            case 'botId':
                if (!value <= 0) err = "Kino Id sini kiritng";
                break;
            case 'description':
                if (value.trim()) err = "Kino haqida bo'lishi shart"
                break;
            default:
                break;
        }
    }

    const validateForm = () => {
        Object.keys(formData).forEach((key) => {
            validateData(key, formData[key]); // Validate each field
        });
        return Object.values(errors).every((error) => error === '' || error === null || error < 0);
    };

    const handleChange = async (e) => {
        const {name, value, files} = e.target;
        let fieldValue = files ? files[0] : value;

        if (name === "genres" && !fieldValue) {
            fieldValue = []
        }
        if (name === "subCategoryType" && !fieldValue) {
            fieldValue = '';
        }
        if (name === "age" && !fieldValue) {
            fieldValue = "";
        }
        if (name === "genre" && !fieldValue) {
            fieldValue = []
        }
        if (name === "subCategory" && !fieldValue) {
            fieldValue = '';
        }

        // Update form data
        setFormData((prevData) => ({
            ...prevData,
            [name]: fieldValue,
        }));

        // Validate the specific field
        validateData(name, fieldValue);
        // If it's an image, preview it
        if (id && name === 'img') {//bu rasm saqlaydigan funksiya
            await DeleteAuto(APP_API.deleteImage, formData.img, "data", getAll)
            formData.img = await UploadFile(APP_API.uploadFile, files[0])
            await AutoSaveAndUpdate(APP_API.movie, formData, id, navigate, '')
            await getAll()
        } else if (name === 'video' && files) {
            const file = files[0];
            if (file && file.type.startsWith('video/')) {//bu vide saqlaydiga funktion
                // Handle video upload logic (similar to image upload)
                await DeleteAuto(APP_API.deleteVideo, formData.video, "data", getAll);
                formData.video = await UploadFile(APP_API.uploadFile, file);
                await AutoSaveAndUpdate(APP_API.movie, formData, id, navigate, '');
                await getAll();
            }
        } else if (files) {
            const file = files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSeeImg(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };


    const formArr = [{
        placeholder: "Kino rasmi",
        type: "image",
        value: formData.img,
        error: !!errors.img,
        helperText: errors.img,
        grid: 6,
        name: "img"
    }, {
        placeholder: "Kino videosi",
        type: 'image',
        value: formData.video,
        error: !!errors.video,
        helperText: errors.video,
        grid: 6,
        name: 'video'
    }, {
        placeholder: 'Kino Bolimi',
        type: 'select',
        value: formData.subCategoryType,
        arr: [{key: "PREMYERA", value: "Premyera"}, {key: 'SERIAL', value: 'Serial'}, {
            key: "UZB",
            value: "Uzbek kino"
        }, {
            key: "HIND",
            value: "Hind Film"
        }, {key: "MULTFILM", value: "Multfilm"}, {key: "RETRO", value: 'Retro Filmlar'}, {
            key: "ANIME",
            value: "Anime"
        }],
        error: !!errors.subCategoryType,
        helperText: errors.subCategoryType,
        grid: 5,
        name: 'subCategoryType'

    }, {
        placeholder: "Kino Janri",
        type: 'multi-select',
        value: formData.genres,
        arr: [
            {key: 'JANGARI', value: 'Jangari'}, {key: 'DRAMA', value: 'Drama'}, {
                key: 'KOMEDIYA',
                value: 'Komediya'
            }, {key: 'MELODRAMA', value: 'Melodrama'}, {key: 'SARGUZASHT', value: 'Sarguzasht'}, {
                key: 'QURQINCHLI',
                value: "Qo'rqinchli"
            }, {key: 'TARIXIY', value: 'Tarixiy'}, {key: 'KLASSIKA', value: 'Klassika'}, {
                key: 'FANTASTIKA',
                value: 'Fantastika'
            }, {key: 'HAYOTIY', value: 'Hayotiy'}, {key: 'TRILLER', value: 'Triller'}, {
                key: 'DETEKTIV',
                value: 'Detrktiv'
            }, {key: 'HUJJATLI', value: 'Hujjatli'},],
        error: !!errors.genres,
        helperText: errors.genres,
        grid: 4,
        name: 'genres',
    }, {
        placeholder: 'Kino yosh chegarasi',
        type: 'select',
        value: formData.age,
        arr: [{key: "M0", value: "0+"}, {key: 'M6', value: '6+'}, {
            key: "M12",
            value: "12+"
        }, {
            key: "M16",
            value: "16+"
        }, {key: "M18", value: "18+"}],
        error: !!errors.age,
        helperText: errors.age,
        grid: 3,
        name: 'age'
    }, {
        placeholder: "Kino nomi",
        type: 'text',
        value: formData.name,
        error: !!errors.name,
        helperText: errors.name,
        grid: 4,
        name: 'name'
    }, {
        placeholder: 'Kino davomiligi',
        type: 'number',
        value: formData.movieTime,
        error: !!errors.movieTime,
        helperText: errors.movieTime,
        grid: 4,
        name: 'movieTime'
    }, {
        placeholder: "Kinoning Davlati",
        type: 'text',
        value: formData.movieCountry,
        error: !!errors.movieCountry,
        helperText: errors.movieCountry,
        grid: 4,
        name: 'movieCountry'
    }, {
        placeholder: 'Kino yili',
        type: "number",
        value: formData.movieYear,
        error: !!errors.movieYear,
        helperText: errors.movieYear,
        grid: 4,
        name: "movieYear",
    }, {
        placeholder: "Kino qanday tilda",
        type: 'text',
        value: formData.language,
        error: !!errors.language,
        helperText: errors.language,
        grid: 4,
        name: "language"
    }, {
        placeholder: "Kino id si",
        type: 'number',
        value: formData.botId,
        error: !!errors.botId,
        helperText: errors.botId,
        grid: 4,
        name: "botId",
    }, {
        placeholder: "Kino haqida",
        type: 'textarea',
        value: formData.description,
        error: !!errors.description,
        helperText: errors.description,
        grid: 12,
        name: 'description'
    }]
    console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = formData.name && formData.img && formData.video && formData.movieYear && formData.movieTime && formData.subCategoryType && formData.genres && formData.language && formData.botId && formData.movieCountry && formData.description
        if (validateForm() && isValid) {

            if (!id) {
                formData.img = await UploadFile(APP_API.uploadFile, formData.img)
                formData.video = await UploadFile(APP_API.uploadFile, formData.video)
                await AutoSaveAndUpdate(APP_API.movie, formData, "", navigate, `/${ADMIN_URLS.movie}`)
            } else {
                await AutoSaveAndUpdate(APP_API.movie, formData, id, navigate, `/${ADMIN_URLS.movie}`)
            }
        } else {
            toast.error("Iltimos so'ralgan hamma ma'lumotni kiriting")
        }
    }
    return (
        <Grid sx={{width: '100%', margin: '0 auto', padding: '10px'}}>
            <CardHeaders name={"Kino saqlash"} status={'back'} link={`/${ADMIN_URLS.movie}`}/>
            <AutoForm formArr={formArr} backLink={`/${ADMIN_URLS.movie}`} handleChange={handleChange}
                      handleSubmit={handleSubmit}/>
        </Grid>
    )
}