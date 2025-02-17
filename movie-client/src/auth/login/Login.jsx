import '../../assets/css/register.css'
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {LoginHandler} from "../../service/userService/AuthService.js";

export const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = async () => {
        const data = {login: email, password}
        await LoginHandler(data, navigate)
    }
    return (
        <div className="background">
            <div className="form-container">
                <h2>Xisobga kirish</h2>
                <form>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email"/>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password"
                           placeholder="Password"/>
                    <div className="options">
                        <label>
                            Roziman
                            <input type="checkbox"/>
                        </label>
                        <a href="#">Parolni unutingizmi</a>
                    </div>
                    <div className="register">
                        <span>Royxatdan haliham otmadingizmi?</span>
                        <Link to={'/register'}>Ro'yxatdan o'tish</Link>
                    </div>
                </form>
                <button onClick={() => login()} className={"button"}>Kirish</button>

            </div>
        </div>
    )
}