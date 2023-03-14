import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Header.css'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-light shadow-lg">
                <a class="navbar-brand" href="/" style={{ marginLeft: '20px', color: 'white' }}> <b>Arosa-Je </b></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto"> {/* Ajout de la classe mx-auto */}
                        <li class="nav-item active">
                            <a class="nav-link" href="/Map" style={{ color: 'white', fontSize: 'xx-large' }}> Garder une plante <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/SearchPlant" style={{ color: 'white', fontSize: 'xx-large' }}>Rechercher une plante</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/AddAdvice" style={{ color: 'white', fontSize: 'xx-large' }}>Ajouter un conseil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/RegisterGarde" style={{ color: 'white', fontSize: 'xx-large' }}>Enregistrer une garde</a>
                        </li>
                    </ul>
                </div>
                <div className="position-relative me-4 ">
                    <button
                        class="circle"
                        type="button"
                        onClick={handleToggle}
                    >
                        <i className="bi bi-person"></i>
                    </button>
                    {isOpen && (
                        <div className="position-absolute end-0 mt-2 me-2 shadow-lg bg-white rounded" style={{ zIndex: 1 }}>
                            <div className="py-2 px-3 border-bottom d-flex justify-content-between align-items-center">
                                <h5 className="m-0">Mon profil</h5>
                            </div>
                            <div className="p-3">
                                <div className="mb-3">
                                    <Link
                                        to="/login"
                                        className="btn btn-primary w-100"
                                        role="button"
                                    >
                                        Se connecter
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        to="/register"
                                        className="btn btn-primary w-100"
                                        role="button"
                                    >
                                        S'inscrire
                                    </Link>
                                </div>
                                <br />
                                <div>
                                    <Link
                                        to="/UserProfil"
                                        className="btn btn-primary w-100"
                                        role="button"
                                    >
                                        Profil
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>           
    )
}
export default Header;



