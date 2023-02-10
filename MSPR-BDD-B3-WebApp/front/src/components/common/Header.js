import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg  bg-primary  d-flex align-items-center justify-content-center">

                <ul className="navbar-nav mr-auto">
                    <li><Link to="/login" className="nav-link"> Login </Link></li>
                    <li><Link to="/Map" className="nav-link">Map</Link></li>
                    <li><Link to="/Register" className="nav-link">Sign-In</Link></li>
                    <li><Link to="/UserProfil" className="nav-link">UserProfil</Link></li>
                    <li><Link to="/DevGa" className="nav-link">Work-In-Progress</Link></li>
                </ul>
            </nav>
        </>
    )
}


export default Header;



