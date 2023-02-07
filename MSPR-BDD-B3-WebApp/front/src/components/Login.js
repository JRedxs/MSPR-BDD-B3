import React from "react";
import '../styles/Login.css';


const LoginPage = () => {

    //front commencé pour maintenant effectuer les tests de connexion / regex du mdp et email / button login

    return(
        <>
            <div className="justify-content-center">
                <div className="card text-center ">
                    <div className="card-body">
                        <h1 className="card-title, text-center">A'Rosa-Je</h1>
                    </div>
                </div>
            </div>

            <br/>
            <div className="card card-login mx-auto" style={{width: "33%", borderRadius: "50px", border: "1px solid black"}}>
                <div className="card-body mx-auto">
                    <div className="d-flex justify-content-center">
                        <form className="mx-auto" style={{width: "60%"}}>
                            <div className="form-group">
                            <label className="form-label" htmlFor="exampleInputEmail1">Adresse Mail</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <br/>
                            <div className="form-group">
                            <label className="form-label" htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <br/>
                            <div className="d-flex align-items-center justify-content-center">
                                    <button className="btn btn-dark" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
            </div>

            </div>
        </>
    )
}
export default LoginPage;