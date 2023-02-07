import './App.css';

import LoginPage             from './components/Login';
import Map                   from './components/Map';
import NotFound              from './components/NotFound'; 
import Register              from './components/Register';
import {Routes, Route, Link} from 'react-router-dom';

const App = () => {
  return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-primary d-flex align-items-center justify-content-center">
          <ul className="navbar-nav mr-auto">
            <li><Link to="/" className="nav-link"> Login </Link></li>
            <li><Link to="/Map" className="nav-link">Map</Link></li>
            <li><Link to="/Register" className="nav-link">Sign-In</Link></li>
            
          </ul>
          </nav>
          <hr />
          <Routes>
            <Route exact path="" element={<LoginPage/>} />
            <Route path="Map" element={<Map/>} />
            <Route path="/Register" element={<Register/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
  );
}
export default App;
