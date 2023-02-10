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
                    <button className='btn btn-success m-1'>Garder une plante </button>
                    <button className='btn btn-success'>localiser une plante </button>
                </div>
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



