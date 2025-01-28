import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {CardHeaders} from "../../companents/CardHeader.jsx";
import {ADMIN_URLS} from "../../utils/URL.js";
import {GetAuto} from "../../connection/service/AppService.js";
import {APP_API} from "../../connection/AppApi.js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}


export const News = () => {
    const [news, setNews] = useState([])

    const getAll = async () => {
        try {
            const res = await GetAuto(`${APP_API.news}/active`, 'data')
            setNews(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    console.log(news)
    useEffect(() => {
        getAll()
    }, []);

    return (
        <Grid sx={{width: "100%", margin: "0 auto", padding: "10px"}}>
            <CardHeaders name={"Reklama va Yangliklar ro'yxati"} status={'save'} link={`/${ADMIN_URLS.addNwes}`}/>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>T/r</TableCell>
                            <TableCell align="right">Nomi</TableCell>
                            <TableCell align="right">sozlamalar</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {news.map((news,i) => (
                            <TableRow
                                key={news.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="item">
                                    {i+1}
                                </TableCell>
                                <TableCell align="right">{news.name}</TableCell>
                                <TableCell align="right"><Button>a</Button></TableCell>
                                <TableCell align="right"><Button>x</Button></TableCell>
                                <TableCell align="right"><Button>l</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}