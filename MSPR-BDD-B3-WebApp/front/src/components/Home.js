import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css'
import logo from '../assets/images/logo.png'


const Home = () => {
    return (
        <>
            {/* <div className="home d-flex align-items-center justify-content-center position-relative" >
                <div className="card  card-space" style={{ width: "25%", heigh: "25%", margin: "5em" }}>
                    <img src={logo} className="card-img-top" alt="logo" />
                    <div className="card-body">
                        <div className=" d-flex align-items-center justify-content-center">
                            <h5 className="card-title">Bienvenue chez A'Rosa je</h5>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <p className="card-text"><b>Pas encore de compte ?</b></p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <p className="card-text"><b>Rejoignez nous en cliquant ici !</b></p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center m-3">
                            <Link className="btn btn-success" to="/Register"> S'inscrire</Link>
                        </div>
                    </div>
                </div>
                <div className="card card-space" style={{ width: "25%", heigh: "25%", margin: "5em" }}>
                    <img src={logo} className="card-img-top" alt="logo" />
                    <div className="card-body">
                        <div className=" d-flex align-items-center justify-content-center">
                            <h5 className="card-title" style={{ margin: "1em" }}>Qui sommes nous ?</h5>
                        </div>
                        <p>
                            <b>
                                <i>
                                    L’entreprise “A’rosa-je ” aide les particuliers à prendre soin de leurs plantes. <br></br><br></br>
                                    Fondée en 1984 elle a tout d’abord été composée d’une petite équipe de botaniste dans une seule ville et est maintenant composée de plus de 1500 botanistes répartis sur toute la France qui rendent service aux propriétaires de plantes de deux façons :<br></br><br></br>
                                    –   En allant garder leurs plantes lorsque les propriétaires sont absents <br></br><br></br>
                                    –   En prodiguant des conseils d’entretien afin que les propriétaires s’occupent de mieux en mieux de leurs plantes.
                                </i>
                            </b>
                        </p>
                    </div>
                </div>
            </div> */}
            <div className="home d-flex align-items-center justify-content-center position-relative">
                <div className="card card-space" style={{ width: "25%", height: "25%", margin: "5em" }}>
                    <img src={logo} className="card-img-top" alt="logo" />
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-center">
                            <h5 className="card-title">Bienvenue chez A'Rosa-je</h5>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <p className="card-text"><strong>Pas encore de compte ?</strong></p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <p className="card-text"><strong>Rejoignez-nous en cliquant ici !</strong></p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center m-3">
                            <Link className="btn btn-success" to="/Register">S'inscrire</Link>
                        </div>
                    </div>
                </div>

                <div className="card card-space" style={{ width: "25%", height: "25%", margin: "5em" }}>
                    <img src={logo} className="card-img-top" alt="logo" />
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-center">
                            <h5 className="card-title" style={{ margin: "1em" }}>Qui sommes-nous ?</h5>
                        </div>
                        <p>
                            <strong>
                                <em>L’entreprise “A’rosa-je” aide les particuliers à prendre soin de leurs plantes.</em>
                            </strong>
                            <br /><br />
                            Fondée en 1984, elle est maintenant composée de plus de 1500 botanistes répartis sur toute la France qui aident les propriétaires de plantes de deux façons :
                            <ul>
                                <li>En allant garder leurs plantes lorsque les propriétaires sont absents</li>
                                <li>En prodiguant des conseils d’entretien afin que les propriétaires s’occupent de mieux en mieux de leurs plantes</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home;