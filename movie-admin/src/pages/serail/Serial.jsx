import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import {GetAuto} from "../../connection/service/AppService.js";
import {APP_API} from "../../connection/AppApi.js";
import {AuthBody} from "../../companents/AuthBody.jsx";
import {Typography, Card, CardContent} from "@mui/material";
import {Loading} from "../../companents/Loading.jsx";

export const Serial = () => {
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(false)
    const getAll = async () => {
        try {
            const res = await GetAuto(APP_API.getMovie, 'data')
            setMovie(res.data)
            setLoading(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAll()
    }, []);
    return (
        <Grid>
            <Card sx={{width: '100%', marginBottom: 2, padding: 2}}>
                <CardContent>
                    <Typography
                        variant="h5"
                        color={movie.subCategoryType === "SERIAL" ? 'red' : 'primary'}
                        textAlign="center"
                    >
                        {loading
                            ? movie.subCategoryType === "SERIAL"
                                ? "HOZIRDA SERIALLAR MAVJUD EMAS!!!"
                                : "SERIALLAR QO'SHISH"
                            : <Loading/>
                        }
                    </Typography>
                </CardContent>
            </Card>

            <AuthBody name={'Movie'} data={movie} update={null} getAll={getAll} autoDelete={true} item={null}
                      isSerial={true}/>
        </Grid>
    )
}