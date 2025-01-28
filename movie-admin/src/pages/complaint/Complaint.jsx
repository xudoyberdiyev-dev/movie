import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Grid from "@mui/material/Grid";

export const Complaint = () => {
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
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[600]}} aria-label="recipe">
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <DeleteForeverIcon/>
                        </IconButton>
                    }
                    title="Quzi quziyev"
                    subheader="22:00"
                />
                <CardContent>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                </CardContent>
            </Card>

        </Grid>


    );
}