import React, { useState } from "react";
import '../styles/Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image from '../styles/image3.jpg';
import logo from '../styles/arosaje.png'


const LoginPage = () => {

    const baseUrl = process.env.REACT_APP_API_URL
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.get(`${baseUrl}/users?email=${email}&password=${password}`);
        const user = response.data.User;
        if (user.length > 0) {
            window.sessionStorage.setItem('person', JSON.stringify(Number(user[0].id_person)));
            navigate(`/SearchPlant`);

        } else {
            console.log("Utilisateur inexistant dans la base de données", response);
        }
    };

    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "white" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src={image} alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form onSubmit={handleSubmit}>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <img src={logo} style={{width: '100px', marginTop: '15px'}}></img>
                                                    <span className="h1 fw-bold mb-0">Arosa-Je</span>
                                                </div>
                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Connectez vous à votre compte</h5>
                                                <div className="form-outline mb-4">
                                                    <input type="email" id="form2Example17" className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} value={email} aria-describedby="emailHelp" placeholder="Enter email" />
                                                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input type="password" id="form2Example27" className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password"/>
                                                    <label className="form-label" htmlFor="form2Example27">Password</label>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg btn-block" type="submit" to="/RegisterPlante">Login</button>
                                                </div>
                                                <a className="small text-muted" href="#!">Forgot password?</a>
                                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Pas encore de compte ? <a href="/Register" style={{ color: "#393f81" }}>Inscrivez vous ici</a></p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default LoginPage;