import * as React from 'react';
import {Box, Button, Card, CardContent, Typography} from '@mui/material';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import {Add,AddCircle,AddCircleOutline} from "@mui/icons-material";

export const CardHeaders = ({status, link, name}) => {
    const navigate = useNavigate()
    return (
        <Card sx={{width: '100%', margin: '0 0 10px', padding: '10px'}}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    {status === 'save' ? (
                        <Button variant="contained" color="primary" onClick={() => navigate(link)}>
                            <AddCircleOutline/>
                        </Button>
                    ) : status === 'back' ? (
                        <Button variant="contained" onClick={() => navigate(link)}
                                sx={{backgroundColor: 'red', '&:hover': {backgroundColor: 'darkred'}}}>
                            <ArrowBackIcon/>
                        </Button>
                    ) : (
                        <></>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};