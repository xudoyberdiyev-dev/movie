import React, {useEffect, useState} from 'react';
import logo from '../../assets/01.png'
import {Link, useNavigate} from "react-router-dom";
import google from '../../assets/google.png'
import {LoginHandler} from "../../connection/service/AuthService.js";
import {ADMIN_URLS} from "../../utils/URL.js";
import '../../css/auth.css'

export const Login = () => {
    // const lan = localStorage.getItem("lan")
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const [err, setErr] = useState(null)

    const login = async () => {
        const data = {login: email, password}
        await LoginHandler(data, navigate, setError, setErr)
    }

    const secury = async () => {
        const token = localStorage.getItem("token")
        if (token !== undefined && token !== null && token !== "undefined") {
            navigate(ADMIN_URLS.dashboard)
        }
    }

    useEffect(() => {
        secury()
    }, [])
    return (
        <div>
            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="row border rounded-5 p-3  bg-white shadow box-area">
                    <div
                        className="col-md-6 rounded-4 left-box d-flex align-items-center justify-content-center flex-column"
                        style={{background: "#fff"}}>
                        <div className="featured-image">
                            <img src={logo} alt="" className={'img-fluid'} style={{width: "250px"}}/>
                        </div>
                        <p className={'fs-2'} style={{fontWeight: "600"}}>W</p>
                        <small className={"text-wrap text-center"} style={{width: "17rem"}}> ahsaj jhas jhg jh </small>
                    </div>
                    <div className="col-md-6 right-box">
                        <div className={"row align-items-center"}>
                            <div className={"header-text md-4"}>
                                <h2>Hisobga Kirish </h2>
                                <p>Hello word</p>
                            </div>
                            <div className={"input-group mb-3"}>
                                <input type="text"
                                       className={"form-control  border-[1.5px] form-control-lg bg-light fs-6 "}
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       placeholder={"Email address"}/>
                            </div>
                            {email.value !== 0 ? error && <b style={{marginTop: "-24px"}}><p
                                className={"text-red-500  text-xs text-danger pb-1 mt-2"}>{error}</p></b> : <></>}

                            <div className={"input-group mb-1"}>
                                <input type="text" className={"form-control form-control-lg bg-light fs-6 "}
                                       placeholder={"Enter address"}
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}/>
                            </div>
                            {err === email ? <></> : err && <b style={{marginTop: "-15px", position: "absolute"}}><p
                                className={"text-red-500  text-xs text-danger pb-1 mt-1"}>{err}</p></b>}


                            <div className="input-group mb-5 d-flex justify-content-between m-1 mt-4">
                                <div className="from-check ">
                                    <input type="checkbox" className={'form-check-input'} id={'formCheck'}/>
                                    <label htmlFor="formCheck" className={"form-check-label text-secondary "}> <small>Remember
                                        Me</small></label>
                                </div>
                                <div className="forgot">
                                    <small className={'text-primary'}><Link to={'#'}>Forgot Password</Link></small>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <button className={"btn btn-lg btn-primary w-100 fs-6"} onClick={() => login()}>Login
                                </button>
                            </div>
                            <div className="input-group mb-3">
                                <button className={"btn btn-lg btn-light w-100 fs-6"}><img src={google}
                                                                                           style={{width: "20px"}}
                                                                                           className={'me-2'}/> Sign In
                                    with Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}