import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg  bg-primary  d-flex align-items-center justify-content-center">
                <div style={{margin: "0"}}>
                    <img src={logo} alt="logo" style={{width: "25%", height: "25%" }}/>
                </div>
                <div className="d-flex align-items-center" >
                    
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
                </ul>
            </nav>
        </>
    )
}
export default Header;



