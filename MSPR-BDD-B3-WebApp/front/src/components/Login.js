import React from "react";
import '../styles/Login.css';


const LoginPage = () => {

    //front commencé pour maintenant effectuer les tests de connexion / regex du mdp et email / button login

    return(
        <>
            <div className="justify-content-center">
                <div className="card text-center ">
                    <div className="card-body">
                        <h1 className="card-title">A'Rosa-Je</h1>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <div className="card  card-color w-25 d-flex align-items-center justify-content-center"> 
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <div className="justify-content-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default LoginPage;