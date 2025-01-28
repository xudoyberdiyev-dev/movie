import React from 'react';
import {Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import {BASE_URL} from "../connection/BaseUrl.js";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import {APP_API} from "../connection/AppApi.js";

export const AutoForm = ({backLink, formArr, handleChange, handleSubmit}) => {
    const navigate = useNavigate()
    const id = useParams().id
    return (
        <Card sx={{width: '100%', margin: '20px 0', padding: '10px'}}>
            <form onSubmit={handleSubmit} className={"w-100"}>
                <Grid container spacing={3}>
                    {formArr.map(item => (
                        item.type === 'select' ? (
                            <Grid item xs={item.grid}>
                                <FormControl fullWidth>
                                    <InputLabel id="gender-label">{item.placeholder}</InputLabel>
                                    <Select
                                        label={item.placeholder}
                                        name={item.name}
                                        value={item.value}
                                        onChange={handleChange}
                                        error={item.error}
                                        helperText={item.helperText}
                                        labelId="gender-label"
                                        variant="outlined"
                                    >
                                        {item.arr.map(i => (
                                            <MenuItem value={i.key}>{i.value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ) : item.type === 'multi-select' ? (
                            <Grid item xs={item.grid}>
                                <FormControl fullWidth>
                                    <InputLabel id="multi-select-label">{item.placeholder}</InputLabel>
                                    <Select
                                        labelId="multi-select-label"
                                        variant="outlined"
                                        label={item.placeholder}
                                        name={item.name}
                                        multiple
                                        value={item.value}
                                        onChange={handleChange}
                                        renderValue={(selected) => selected.join(", ")}
                                        error={item.error}
                                        helperText={item.helperText}
                                    >
                                        {item.arr.map((option) => (
                                            <MenuItem key={option.key} value={option.key}>
                                                <Checkbox checked={item.value.includes(option.key)}/>
                                                <ListItemText primary={option.value}/>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ) : (
                            <Grid item xs={item.grid}>
                                {item.type === 'textarea' ? (
                                    <TextField
                                        fullWidth
                                        label={item.placeholder}
                                        name={item.name}
                                        variant="outlined"
                                        value={item.value}
                                        onChange={handleChange}
                                        error={item.error}
                                        helperText={item.helperText}
                                        type={item.type}
                                        multiline
                                        rows={4}
                                    />
                                ) : item.type === 'image' ? (
                                    <>
                                        <TextField
                                            fullWidth
                                            label={item.placeholder}
                                            name={item.name}
                                            variant="outlined"
                                            // value={item.value}
                                            onChange={handleChange}
                                            error={item.error}
                                            helperText={item.helperText}
                                            type={"file"}
                                            inputProps={{accept: 'image/*'}}
                                        />
                                        {id && item.value ? (
                                            <Grid item xs={12}>
                                                <Typography variant="h6" gutterBottom>
                                                    Yuklangan rasm:
                                                </Typography>
                                                <Box
                                                    component="img"
                                                    src={`${BASE_URL}${APP_API.downloadImage}${item.value}`}
                                                    alt="Uploaded Image"
                                                    sx={{width: '100%', maxHeight: 400, objectFit: 'cover'}}
                                                />
                                            </Grid>
                                        ) : (
                                            item.seeImg && (
                                                <Grid item xs={12}>
                                                    <Typography variant="h6" gutterBottom>
                                                        Yuklangan rasm:
                                                    </Typography>
                                                    <Box
                                                        component="img"
                                                        src={item.seeImg}
                                                        alt="Uploaded Image"
                                                        sx={{width: '100%', maxHeight: 400, objectFit: 'cover'}}
                                                    />
                                                </Grid>
                                            )
                                        )}
                                    </>
                                ) : (
                                    <TextField
                                        fullWidth
                                        label={item.placeholder}
                                        name={item.name}
                                        variant="outlined"
                                        value={item.value}
                                        onChange={handleChange}
                                        error={item.error}
                                        helperText={item.helperText}
                                        type={item.type}
                                    />
                                )}
                            </Grid>
                        )
                    ))}
                    <Grid item xs={6}>
                        <Button fullWidth type="submit" variant="contained" color="primary">
                            Saqlash
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth onClick={() => navigate(backLink)} variant={"outlined"}>
                            Bekor qilish
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
        ;
};

