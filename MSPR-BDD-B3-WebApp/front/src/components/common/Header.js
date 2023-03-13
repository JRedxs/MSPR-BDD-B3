import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import '../../styles/Header.css'
const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            {/* <nav className="navbar navbar-expand-lg  bg-info  d-flex align-items-center justify-content-center" style={{borderRadius: '15px'}}>
            <div style={{margin: "0"}}>
                <Link to="/">
                    <img src={logo} alt="logo" style={{width: "25%", height: "25%" }}/>
                </Link>
                    
            </div>
            <div className="drop-down-menu">  
                <Container className='p-4'>  
                 <DropdownButton size='md' variant="success" id="dropdown-basic-button" title="Menu">  
                 <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>  
                 <Dropdown.Item as={Link} to="/UserProfil">Profil utilisateur</Dropdown.Item>  
                 <Dropdown.Item as={Link} to="/Register">Se créer un compte</Dropdown.Item>
                 <Dropdown.Item as={Link} to="/Map">Garder une plante</Dropdown.Item>  
                 <Dropdown.Item as={Link} to="/DevGa">Photo</Dropdown.Item> 
                 <Dropdown.Item as={Link} to="/SearchPlant">Rechercher une plante</Dropdown.Item>
                 <Dropdown.Item as={Link} to="/Plante">Plantes</Dropdown.Item>     
                 <Dropdown.Item as={Link} to="/AddAdvice">Ajouter un conseil</Dropdown.Item> 
                 <Dropdown.Item as={Link} to="/RegisterGarde">Enregistrer une garde</Dropdown.Item> 
                </DropdownButton>  
                </Container>  
            </div>  
            </nav> */}
            <nav class="navbar navbar-expand-lg navbar-light shadow-lg">
                <a class="navbar-brand" href="/" style={{marginLeft: '20px' , color: 'white'}}> <b>Arosa-Je </b></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/Map" style={{color: 'white'}}> Garder une plante <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/DevGa" style={{color: 'white'}}>Ajouter une photo</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/SearchPlant" style={{color: 'white'}}>Rechercher une plante</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/AddAdvice" style={{color: 'white'}}>Ajouter un conseil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/RegisterGarde" style={{color: 'white'}}>Enregistrer une garde</a>
                        </li>
                    </ul>
                </div>
                <div className="position-relative">
                    <button 
                        // className="btn btn-outline-secondary rounded-circle ms-2 shadow-lg"
                        class="circle"
                        type="button"
                        onClick={handleToggle}
                    > 
                        <i className="bi bi-person"></i>
                    </button>
                    {isOpen && (
                        <div className="position-absolute end-0 mt-2 me-2 shadow-lg bg-white rounded" style={{ zIndex: 1}}>

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
                                <br/>
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

        </>
    )
}
export default Header;



