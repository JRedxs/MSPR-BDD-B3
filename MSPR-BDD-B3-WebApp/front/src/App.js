import './App.css';
import LoginPage             from './components/Login';
import Map                   from './components/Map';
import NotFound              from './components/NotFound'; 
import Home                  from './components/Home';
import Register              from './components/Register';
import Header                from './components/common/Header';
import Footer                from './components/common/Footer';  
import RegisterPhoto         from './components/RegisterPhoto'
import {Routes, Route}       from 'react-router-dom';
import UserProfil from './components/UserProfil';
import AddAdvice from './components/AdvicePlant';
import Plante from './components/Plante';
import SearchPlant from './components/SearchPlant';


const App = () => {
  return (
      <div>
        <Header/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="Map" element={<Map/>} />
            <Route path="/Register" element={<Register/>}/>
            <Route path="/DevGa" element={<RegisterPhoto/>}/>
            <Route path="/UserProfil" element={<UserProfil/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/AddAdvice/:id" element={<AddAdvice/>}/>
            <Route path="/Plante/:id" element={<Plante/>}/>
            <Route path="/SearchPlant" element={<SearchPlant/>}/>
        </Routes>
        <Footer/>
      </div>
  );
}
export default App;
