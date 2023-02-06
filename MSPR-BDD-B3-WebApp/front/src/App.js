import './App.css';

import LoginPage             from './components/Login';
import Map                   from './components/Map';
import NotFound              from './components/NotFound'; 
import {Routes, Route, Link} from 'react-router-dom';

const App = () => {
  return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <ul className="navbar-nav mr-auto">
            <li><Link to="/" className="nav-link"> Login </Link></li>
            <li><Link to="/Map" className="nav-link">Map</Link></li>
          </ul>
          </nav>
          <hr />
          <Routes>
            <Route exact path="" element={<LoginPage/>} />
            <Route path="Map" element={<Map/>} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
  );
}
export default App;
