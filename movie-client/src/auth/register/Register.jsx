import '../../assets/css/register.css'
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {RegisterHandler} from "../../service/userService/AuthService.js";

export const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const register = async () => {
        try {
            const data = {name, surname, email, password}
            await RegisterHandler(data, navigate)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="background">
            <div className="form-container">
                <h2>Ro'yxatdan o'tish </h2>
                <form>
                    <input value={name} onChange={e => setName(e.target.value)} type="text"
                           placeholder="Ismni kiritng"/>
                    <input value={surname} onChange={e => setSurname(e.target.value)} type="text"
                           placeholder="Familya"/>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email"/>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password"
                           placeholder="Password"/>

                </form>
                <button onClick={() => register()} className={"button"}>Royxatdan otish</button>

                <div className="options">
                    <label>
                        Roziman
                        <input type="checkbox"/>
                    </label>
                    <a href="#">Parolni unutingizmi</a>
                </div>
                <div className="register">
                    <span>Allaqachon akountingiz bormi?</span>
                    <Link to={'/login'}>Kirish</Link>
                </div>
            </div>
        </div>
    )
}