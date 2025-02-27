import {Card, CardContent, Typography, Avatar, Container, Grid} from "@mui/material";

export const Profile = () => {
    const user = {
        name: "Azizbek",
        surname: "Xudoyberdiyev",
        email: "movie@gmail.com ",
        roles: ["ADMIN", "USER"], // Rollarni massiv sifatida ko'rsatamiz
    };
    return (
        <Container style={{padding: "20px", maxWidth: "600px"}}>
            <Card sx={{padding: 3, textAlign: "center"}}>
                <Avatar sx={{width: 80, height: 80, margin: "auto", bgcolor: "primary.main"}}>
                    {user.name.charAt(0)}
                </Avatar>
                <CardContent>
                    <Typography variant="h5">{user.name} {user.surname}</Typography>
                    <Typography color="textSecondary">{user.email}</Typography>

                    <Grid container justifyContent="center" spacing={1} sx={{marginTop: 1}}>
                        {user.roles.map((role, index) => (
                            <Grid item key={index}>
                                <Typography variant="body2" sx={{
                                    bgcolor: "secondary.main",
                                    color: "#fff",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: "5px"
                                }}>
                                    {role}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}
