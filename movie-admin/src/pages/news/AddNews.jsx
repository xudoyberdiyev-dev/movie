import Grid from "@mui/material/Grid";
import {CardHeaders} from "../../companents/CardHeader.jsx";
import {ADMIN_URLS} from "../../utils/URL.js";
import {useEffect, useState} from "react";
import {AutoForm} from "../../companents/AutoForm.jsx";
import {APP_API} from "../../connection/AppApi.js";
import {AutoSaveAndUpdate, DeleteAuto, GetAuto, UploadFile} from "../../connection/service/AppService.js";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";

export const AddNews = () => {
    const id = useParams().id
    const navigate = useNavigate()
    const [seeImg, setSeeImg] = useState(null);

    const [news, setNews] = useState({})

    const getAll = async () => {
        try {
            const res = await GetAuto(`${APP_API.news}/${id}`, 'data')
            const newData = {
                name: res.data.name,
                img: res.data.img
            }
            setNews(res.data)
            setFormData(newData)
        } catch (err) {
            console.log(err)
        }
    }
    if (id) {
        useEffect(() => {
            getAll()
        }, []);
    }


    const [formData, setFormData] = useState({
        name: "",
        img: ""
    });
    const [errors, setErrors] = useState({
        name: '',
        img: ''
    });

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'name':
                if (!value.trim()) error = 'Reklama nomini kiritish majburiy!';
                break;
            case 'img':
                if (!value) error = 'Iltimos rasmni tanlang!';
                // else if (!value.type.startsWith('image/')) error = 'Rasm fayli bo‘lishi shart!';
                break;
            default:
                break;
        }
        // Update the errors state with the new error for this field
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const validateForm = () => {
        Object.keys(formData).forEach((key) => {
            validateField(key, formData[key]); // Validate each field
        });
        return Object.values(errors).every((error) => error === '' || error === null || error < 0);
    };

    const handleChange = async (e) => {
        const {name, value, files} = e.target;
        const fieldValue = files ? files[0] : value;

        // Update form data
        setFormData((prevData) => ({
            ...prevData,
            [name]: fieldValue,
        }));

        // Validate the specific field
        validateField(name, fieldValue);
        // If it's an image, preview it
        if (id && name === 'img') {
            await DeleteAuto(APP_API.deleteImage, formData.imageOrVideo, "data", getAll)
            formData.imageOrVideo = await UploadFile(APP_API.uploadFile, files[0])
            await AutoSaveAndUpdate(APP_API.news, formData, id, navigate, '')
            await getAll()
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let is = formData.name && formData.img
        if (validateForm() && is) {
            if (!id) {
                formData.img = await UploadFile(APP_API.uploadFile, formData.img)
                await AutoSaveAndUpdate(APP_API.news, formData, "", navigate, `/${ADMIN_URLS.news}`)
            } else {
                await AutoSaveAndUpdate(APP_API.news, formData, id, navigate, `/${ADMIN_URLS.news}`)
            }
        } else {
            toast.error("Iltimos so'ralgan hamma ma'lumotni kiriting")
        }
    };


    const formArr = [{
        placeholder: "Yanglik rasmi yoki videosi",
        type: "image",
        value: formData.img,
        errors: !!errors.img,
        helperText: errors.img,
        grid: 6,
        seeImg: seeImg,
        name: 'img'
    }, {
        placeholder: "Yanglik nomi",
        type: "text",
        value: formData.name,
        errors: !!errors.name,
        helperText: errors.name,
        grid: 6,
        name: 'name'
    }]

    return (
        <Grid sx={{width: '100%', margin: '0 auto', padding: '10px'}}>
            <CardHeaders name={"Reklama qos'hish"} status={'back'} link={`/${ADMIN_URLS.news}`}/>
            <AutoForm formArr={formArr} backLink={`/${ADMIN_URLS.news}`} handleChange={handleChange} handleSubmit={handleSubmit}/>
        </Grid>
    )
}