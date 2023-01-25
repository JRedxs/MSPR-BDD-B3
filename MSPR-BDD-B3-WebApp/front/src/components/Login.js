import React from "react";
// import { TextInput } from "react-native";
import '../styles/Login.css';


function LoginPage(){

    //front commencé pour maintenant effectuer les tests de connexion / regex du mdp et email / button login

    return(
        <>
            <div className="name-company">
                <h1>A'Rosa-Je</h1>
            </div>

            <div className="box-login">
                <div className="input-mail">
                    <input placeholder="e-mail" type="text"></input>
                </div>
                <br/>
                <div className="input-password">
                    <input placeholder="password" type="text"></input>
                </div>
                <br/>
                <div className="button-login">
                    <button>Login</button>
                </div>
            </div>

        </>
    )
}


export default LoginPage;