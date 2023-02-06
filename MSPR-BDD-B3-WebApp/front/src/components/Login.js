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
            <div className="card mx-auto" style={{width: "33%", borderRadius: "50px", border: "1px solid black"}}>
                <div className="card-body mx-auto">
                    <div class="d-flex justify-content-center">
                        <form class="mx-auto" style={{width: "60%"}}>
                            <div class="form-group">
                            <label for="exampleInputEmail1">Adresse Mail</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <br/>
                            <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
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