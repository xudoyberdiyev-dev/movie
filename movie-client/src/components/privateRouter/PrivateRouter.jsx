import {Navigate} from "react-router-dom";

export const PrivateRouter = ({children}) => {
    const token = localStorage.getItem("token")
    if (!token) {
        return <Navigate to={'/login'}/>
    }
    return children
}