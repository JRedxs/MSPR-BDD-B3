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
                <Dropdown.Item as={Link} to="/Map">Garder une plante</Dropdown.Item>  
                <Dropdown.Item as={Link} to="/Register">Enregistrer une plante</Dropdown.Item>
                <Dropdown.Item as={Link} to="/DevGa">WIP</Dropdown.Item> 
                <Dropdown.Item as={Link} to="/AddAdvice">Ajouter un conseil</Dropdown.Item>  
                </DropdownButton>  
                </Container>  
             </div>  

                {/* <div style={{margin: "0"}}>
                    <img src={logo} alt="logo" style={{width: "25%", height: "25%" }}/>
                </div> */}
                {/* <div className="d-flex align-items-center" >
                    
                    <Link to="/Map" className='btn btn-success m-1' >Garder une plante </Link>
                    <Link to="*" className='btn btn-success'>localiser une plante </Link>
                    <Link to="/login" className="nav-link btn btn-success"> Login </Link>
                    <Link to="/Map" className="nav-link btn btn-success">Map</Link>
                    <Link to="/Register" className="nav-link btn btn-success">Sign-In</Link>
                    <Link to="/UserProfil" className="nav-link btn btn-success">UserProfil</Link>
                    <Link to="/DevGa" className="nav-link btn btn-success">Work-In-Progress</Link>
                    <Link to="/AddAdvice" className="nav-link btn btn-success">Ajouter un conseil</Link>
                </div>
                <ul className="navbar-nav mr-auto">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul> */}

            </nav>
        </>
    )
}
export default Header;



