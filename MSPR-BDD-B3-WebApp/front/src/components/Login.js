import React, { useState } from "react";
import '../styles/Login.css';
import logo from '../assets/images/logo.png'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


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
        console.log("Utilisateur inscrit dans la base de données",response);
        navigate(`/SearchPlant`);

      } else {
        console.log("Utilisateur inexistant dans la base de données",response);
      }
    };

    return (
        <>
            <div className="justify-content-center">
                <div className="card text-center mx-auto" >
                    <div className="card-body" >
                        <img src={logo} alt="logo" />
                        <logo />
                    </div>
                </div>
            </div>

            <br />
            <div className="card card-login mx-auto" style={{ width: "33%", borderRadius: "50px", border: "1px solid black" }}>
                <div className="card-body mx-auto">
                    <div className="d-flex justify-content-center margin-login-card">
                        <form className="mx-auto" onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="exampleInputEmail1"> <b>Email : </b> </label>
                                <input type="email" className="form-control" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <br />
                            <div className="form-group">
                                <label className="form-label" htmlFor="exampleInputPassword1"><b> Password : </b> </label>
                                <input type="password" className="form-control" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
                            </div>
                            <br />
                            <div className="d-flex align-items-center justify-content-center">
                                <button className="btn btn-dark" type="submit" to="/DevGa">Login</button>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <h3> Pas encore inscrit ? </h3>
                            </div>
                            <div className="d-flex align-items-center justify-content-center register-btn">
                                <Link className="btn" to="/register"><b> <u>S'inscrire</u> </b> </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
export default LoginPage;