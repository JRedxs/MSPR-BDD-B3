import React from "react";
import '../styles/Login.css';
import logo from '../assets/images/logo.png'
import { Link } from "react-router-dom";


const LoginPage = () => {

    //front commencé pour maintenant effectuer les tests de connexion / regex du mdp et email / button login

    return(
        <>
            <div className="justify-content-center">
                <div className="card text-center mx-auto" >
                    <div className="card-body" >
                        <img src={logo} alt="logo"/>
                        <logo/>
                    </div>
                </div>
            </div>
            <br/>
            <div className="card card-login mx-auto" style={{width: "33%", borderRadius: "50px", border: "1px solid black"}}>
                <div className="card-body mx-auto">
                    <div className="d-flex justify-content-center margin-login-card">
                        <form className="mx-auto" style={{width: "100%"}}>
                            <div className="form-group">
                            <label className="form-label" htmlFor="exampleInputEmail1">Email : </label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <br/>
                            <div className="form-group">
                            <label className="form-label" htmlFor="exampleInputPassword1">Password : </label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <br/>
                            <div className="d-flex align-items-center justify-content-center log-btn">
                                    <button className="btn btn-dark" type="submit">Login</button> 
                            </div>
                            <div className="d-flex align-items-center justify-content-center register-btn">
                                <div className="d-flex align-items-center justify-content-center register-btn">
                                    <p> <b>Pas encore inscrit ?</b> </p> 
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center register-btn">
                                <Link className="btn" to="/register"><u>S'inscrire</u> </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginPage;