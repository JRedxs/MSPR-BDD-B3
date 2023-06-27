import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Header.css';
import { FaUser } from 'react-icons/fa';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        window.sessionStorage.removeItem('access_token');
        setIsOpen(false);  // ferme le menu si ouvert
        navigate('/login');  // redirige vers la page de connexion
    };

    const isLoggedIn = !!window.sessionStorage.getItem('access_token');

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light shadow-lg">
                <a className="navbar-brand" href="/" style={{ marginLeft: '20px', color: 'white' }}><b>Arosa-Je </b></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto"> {/* Ajout de la classe mx-auto */}
                        <li className="nav-item active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {isLoggedIn && (
                                <a
                                    className="nav-link"
                                    href="/Map"
                                    style={{
                                        color: 'white',
                                        fontSize: '14px',
                                        padding: '8px 12px',
                                        border: '1px solid white',
                                        borderRadius: '4px',
                                        backgroundColor: 'transparent',
                                        textDecoration: 'none',
                                        marginRight: '10px' 
                                    }}
                                >
                                    Garder une plante
                                    <span className="sr-only">(current)</span>
                                </a>
                            )}
                        </li>
                        <li className="nav-item active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {isLoggedIn && (
                                <a
                                    className="nav-link"
                                    href="/SearchPlant"
                                    style={{
                                        color: 'white',
                                        fontSize: '14px',
                                        padding: '8px 12px',
                                        border: '1px solid white',
                                        borderRadius: '4px',
                                        backgroundColor: 'transparent',
                                        textDecoration: 'none',
                                        marginLeft: '10px' 
                                    }}
                                >
                                    Rechercher une plante
                                </a>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="position-relative me-4">
                    <button
                        className="circle"
                        type="button"
                        onClick={handleToggle}
                    >
                        <FaUser />
                        <i className="bi bi-person"></i>
                    </button>
                    {isOpen && (
                        <div className="position-absolute end-0 mt-2 me-2 shadow-lg bg-white rounded" style={{ zIndex: 1 }}>
                            <div className="py-2 px-3 border-bottom d-flex justify-content-center align-items-center" style={{ backgroundColor: '#8E685A', color: 'white' }}>
                                <h5 className="d-flex m-0 justify-content-center">Partie utilisateur</h5>
                            </div>
                            <div className="p-3" style={{ backgroundColor: '#6F8C4F', color: 'white', borderColor: 'black', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginTop: 'auto', marginBottom: '10px' }}>
                                    {!isLoggedIn && (
                                        <Link
                                            to="/login"
                                            className="btn btn-primary w-100"
                                            role="button"
                                            style={{ backgroundColor: '#8E685A', color: 'white', border: 'none' }}
                                        >
                                            Se connecter
                                        </Link>
                                    )}
                                </div>
                                <br />
                                <div>
                                    {!isLoggedIn && (
                                        <Link
                                            to="/register"
                                            className="btn btn-primary w-100"
                                            role="button"
                                            style={{ backgroundColor: '#8E685A', color: 'white', border: 'none' }}
                                        >
                                            S'inscrire
                                        </Link>
                                    )}
                                </div>
                                <br />
                                <div style={{ marginTop: 'auto', marginBottom: '10px' }}>
                                    {isLoggedIn && (
                                        <Link
                                            to="/UserProfil"
                                            className="btn btn-primary w-100"
                                            role="button"
                                            style={{ backgroundColor: '#8E685A', color: 'white', border: 'none' }}
                                        >
                                            Profil
                                        </Link>
                                    )}
                                </div>
                                <br />
                                <div>
                                    {isLoggedIn && (
                                        <Link
                                            to=""
                                            className="btn btn-primary w-100"
                                            role="button"
                                            onClick={handleLogout}
                                            style={{ backgroundColor: '#8E685A', color: 'white', border: 'none' }}
                                        >
                                            Se déconnecter
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Header;
