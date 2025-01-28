import Grid from "@mui/material/Grid";
import {Card, CardContent, Typography} from "@mui/material";
import {Loading} from "../../companents/Loading.jsx";
import {useEffect, useState} from "react";
import {GetAuto} from "../../connection/service/AppService.js";
import {AuthBody} from "../../companents/AuthBody.jsx";
import {APP_API} from "../../connection/AppApi.js";

export const NewMovie = () => {
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(false)

    const getAll = async () => {
        try {
            const res = await GetAuto(APP_API.getPremyeraMovie, 'data')
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
                        color={movie.length === 0 ? 'red' : 'primary'}
                        textAlign="center"
                    >
                        {loading
                            ? (movie.length === 0
                                ? "HOZIRDA PREMYERA KINOLAR MAVJUD EMAS!!!"
                                : "PREMYERA KINOLAR ROYXATI")
                            : <Loading/>
                        }
                    </Typography>
                </CardContent>
            </Card>
            <AuthBody name={"NewMovie"} data={movie} update={null} autoDelete={null} item={null} isSerial={false}
                      activeMovies={true}/>
        </Grid>
    )
}

