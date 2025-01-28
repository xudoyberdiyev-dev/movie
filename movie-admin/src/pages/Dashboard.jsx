import Grid from "@mui/material/Grid2";
import {Card, CardContent, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {GetAuto} from "../connection/service/AppService.js";
import {APP_API} from "../connection/AppApi.js";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export const Dashboard = () => {
    const [statistics, setStatistics] = useState({
        usersCount: 0,
        moviesCount: 0
    });
    const statistikalar = {
        labels: [ 'Ro\'yxatdan O\'tganlar','Kinolar',"botdan royxatdan otganlar"],
        datasets: [
            {
                label: 'Statistikalar',
                data: [statistics.usersCount, statistics.moviesCount,statistics.usersCount], // Bu yerga haqiqiy ma'lumotlaringizni kiriting (masalan, jami kinolar, ro'yxatdan o'tganlar)
                backgroundColor: ['green', 'red','blue'],
                borderColor: ['green', 'red','blue'],
                borderWidth: 5,
            },
        ],
    };

    const getStatistics = async () => {
        try {
            const res = await GetAuto(APP_API.statistics)
            setStatistics(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getStatistics()
    }, []);
    return (
        <Grid>
            <Card sx={{width: '100%', marginBottom: 2, padding: 2}}>
                <CardContent>
                    <Typography
                        variant="h5"
                        color={'primary'}
                        textAlign="center"
                    >
                        UMUMIY STATISTIKA
                    </Typography>
                </CardContent>
            </Card>
            <div style={{width:"300px",height:"300px"}}>
                <Pie data={statistikalar}  />

            </div>
            <Grid style={{width: 1260, display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
                <Card style={{width: 400}}>
                    <CardContent>
                        <Typography variant="h6" sx={{textAlign: "center"}}>Saytdan ro'yxatdan o'tganlar</Typography>
                        <Typography variant="h5" sx={{textAlign: "center"}}>{statistics.usersCount}</Typography>
                    </CardContent>
                </Card>
                <Card style={{width: 400}}>
                    <CardContent>
                        <Typography variant="h6" sx={{textAlign: "center"}}>Kinolar soni</Typography>
                        <Typography variant="h5" sx={{textAlign: "center"}}>{statistics.moviesCount}</Typography>
                    </CardContent>
                </Card>
                <Card style={{width: 400}}>
                    <CardContent>
                        <Typography variant="h6" sx={{textAlign: "center"}}>Botdan ro'yxatdan o'tganlar</Typography>
                        <Typography variant="h5" sx={{textAlign: "center"}}>{statistics.moviesCount}</Typography>
                    </CardContent>
                </Card>

            </Grid>
        </Grid>

    )
}