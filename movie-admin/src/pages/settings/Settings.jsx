import {Button} from "@mui/material";

export const Settings = () => {

    const logOut = async () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <div>
            <Button onClick={() => logOut()}>Chiqish</Button>
        </div>
    )
}