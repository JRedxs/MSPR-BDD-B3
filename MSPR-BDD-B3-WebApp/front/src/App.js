import './App.css';
import LoginPage             from './components/Login';
import Map                   from './components/Map';
import NotFound              from './components/NotFound'; 
import Home                  from './components/Home';
import Register              from './components/Register';
import Header                from './components/common/Header';
import Footer                from './components/common/Footer';  
import RegisterPhoto         from './components/RegisterPhoto';

import {Routes, Route, Link} from 'react-router-dom';

const App = () => {
  return (
      <div>
        <Header/>
          <nav className="navbar navbar-expand-lg navbar-light bg-primary d-flex align-items-center justify-content-center">
          <ul className="navbar-nav mr-auto">
            <li><Link to="/" className="nav-link"> Login </Link></li>
            <li><Link to="/Map" className="nav-link">Map</Link></li>
            <li><Link to="/Register" className="nav-link">Sign-In</Link></li>
            <li><Link to="/DevGa" className="nav-link">Work-In-Progress</Link></li>
            
          </ul>
          </nav>
          <hr />
          <Routes>
            <Route exact path="/home" element={<Home/>}/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="Map" element={<Map/>} />
            <Route path="/Register" element={<Register/>}/>
            <Route path="/DevGa" element={<RegisterPhoto/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        <Footer/>
      </div>
  );
}
export default App;
