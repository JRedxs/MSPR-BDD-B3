import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container ,Dropdown,  DropdownButton} from 'react-bootstrap'; 
import '../../styles/Header.css'
const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg  bg-success  d-flex align-items-center justify-content-center">
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
            </nav>
        </>
    )
}
export default Header;



