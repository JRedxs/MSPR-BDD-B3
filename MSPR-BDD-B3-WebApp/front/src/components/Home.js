import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css'



const Home = () =>{
    return (
        <div className="d-flex align-items-center justify-content-center" >
            <div className="card  card-space" style={{width: "18rem"}}>
                <img src="https://react-etc.net/files/2020-05/deno-node-js-logo.png" className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">Bienvenue chez A'Rosa je</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className="d-flex align-items-center justify-content-center">
                            <Link className="btn btn-primary" to="/Register"> S'inscrire</Link>
                    </div>
                </div>
            </div>
            <div className="card card-space" style={{width: "18rem"}}>
                <img src="https://react-etc.net/files/2020-05/deno-node-js-logo.png" className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">Bienvenue chez A'Rosa je</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className="d-flex align-items-center justify-content-center">
                            <Link className="btn btn-primary" to="/Register"> S'inscrire</Link>
                    </div>
                </div>
            </div>

        </div>

        
        
    )
}

export default Home;