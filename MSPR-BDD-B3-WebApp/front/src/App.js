import './App.css';
import LoginPage             from './components/Login';
import Map                   from './components/Map';
import NotFound              from './components/NotFound'; 
import Home                  from './components/Home';
import Register              from './components/Register';
import Header                from './components/common/Header';
import Footer                from './components/common/Footer';  
import RegisterPhoto         from './components/RegisterPhoto'
import Garde                 from './components/Garde';
import ResetPassword         from './components/ResetPassword';
import RegisterPlante        from './components/RegisterPlante';
import RegisterFirstPhoto    from './components/RegisterFirstPhoto';
import RegisterGarde         from './components/RegisterGarde'; 
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
            <Route path='/changePass' element={<ResetPassword/>}/>
            <Route path="/Map" element={<Map/>} />
            <Route path="/Register" element={<Register/>}/>
            <Route path="/UserProfil" element={<UserProfil/>}/>
            <Route path="/Garde/:id" element={<Garde/>}/>
            <Route path="/DevGa" element={<RegisterPlante/>}/>
            <Route path="/RegisterPlante" element={<RegisterPlante/>}/>
            <Route path="/FirstPhoto" element={<RegisterFirstPhoto/>}/>
            <Route path="/Photo" element={<RegisterPhoto/>}/>
            <Route path="/UserProfil" element={<UserProfil/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/AddAdvice/:id_plante" element={<AddAdvice/>}/>
            <Route path="/Plante/:id_plante" element={<Plante/>}/>
            <Route path="/SearchPlant" element={<SearchPlant/>}/>
            <Route path="/RegisterGarde" element={<RegisterGarde/>}/>
        </Routes>
        <Footer/>
      </div>
  );
}
export default App;
