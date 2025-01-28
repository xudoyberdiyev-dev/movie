import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import {AuthBody} from "../../companents/AuthBody.jsx";
import {useEffect, useState} from "react";
import {GetAuto} from "../../connection/service/AppService.js";
import {APP_API} from "../../connection/AppApi.js";
import {Loading} from "../../companents/Loading.jsx";

export const Complaint = () => {
    const [complaint, setComplaint] = useState([])
    const [loading, setLoading] = useState(false)

    const getAll = async () => {
        try {
            const res = await GetAuto(APP_API.complaint, 'data')
            setComplaint(res.data.reverse())
            setLoading(true)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAll()
    }, []);
    return (
        <Grid sx={{width: "100%", margin: "0 auto", padding: "10px"}}>
            <Card sx={{width: '100%', marginBottom: 2, padding: 2}}>
                <CardContent>
                    <Typography
                        variant="h5"
                        color={'primary'}
                        textAlign="center"
                    >
                        Foydalanuvchilardan kelgan murojat va shikoyatlar
                    </Typography>
                </CardContent>
            </Card>
            {loading.length!==0 ? (
                <AuthBody name={"Complaint"} data={complaint}/>
            ) : (
                <Loading/>
            )}
        </Grid>


    );
}