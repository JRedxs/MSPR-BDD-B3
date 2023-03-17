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
        try {
          const response = await axios.get(`${baseUrl}/users?email=${email}&password=${password}`);
          const user = response.data.User;
          console.log(user);
          if (user) {
            window.sessionStorage.setItem('person', JSON.stringify(user.id_person));
            navigate(`/SearchPlant`);
          } else {
            console.log("Incorrect email or password");
          }
        } catch (error) {
          console.error(error);
        }
      };
      
    

    

    return (
        <>
        <div className='body'>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card login" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0 d-flex justify-content-center align-items-center">
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form onSubmit={handleSubmit}>
                                                <div className="d-flex justify-content-center align-items-center mb-3 pb-1">
                                                    <img src={logo} style={{width: '25em', marginTop: '15px'}}></img>
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
                                                <div className="d-flex justify-content-center pt-1 mb-4">
                                                    <button className="btn btn-success btn-lg btn-block m-1" style={{ backgroundColor: '#8E685A ', color: 'white' }} type="submit" to="/RegisterPlante">Login</button>
                                                    {/* <button className="btn btn-success btn-lg btn-block m-1"  style={{ backgroundColor: '#8E685A ', color: 'white' }} to="/changePass">Forgot password?</button> */}
                                                </div>
                                                
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
        </div>
        </>
    )
}
export default LoginPage;