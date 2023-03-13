import React , {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/fr';
import axios from "axios";

const Garde = () => {
    

    const baseUrl = process.env.REACT_APP_API_URL; // URL de base pour les appels API
    const [infosplante, setInfos] = useState({});
    const [infosusers, setUsers] = useState({});
    const [garde, setGarde] = useState({});



    useEffect(() => {
    // récupérer les infos depuis le sessionStorage
    const fetchData = async() => {
        try {
            const gardeInfo = JSON.parse(sessionStorage.getItem('plant'));
            const usersInfo = JSON.parse(sessionStorage.getItem('user'))
            setInfos(gardeInfo);
            setUsers(usersInfo);
        } catch(error) {
            console.error(error)
        }
    };
    fetchData();
    }, []);

    const handleOnClick = async () => {
        const usersInfo = JSON.parse(sessionStorage.getItem("user"));
        try {
          const response_garde = await axios.put(
            `${baseUrl}/garde/${usersInfo.id_garde}?id_person=1`
          );
          const gardeData = response_garde.data;
          console.log("Garde ajouté :", gardeData);
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <>
            <div className="d-flex align-items-center">
                <Link className="btn" type="submit" style={{ color: 'white', backgroundColor: '#55E6C1', marginTop: '10px', marginLeft: '10px' }} to="/Map">Retour</Link>
            </div>
    
            <h1 style={{ textAlign: 'center' }}>
                Informations de la plante :
            </h1>
            <div className="card card-login mx-auto" style={{ width: "27%", borderRadius: "25px", border: "1px solid black"}}>
                <div className="card-body mx-auto">
                    <div className="d-flex justify-content-center margin-login-card">
                        <form className="mx-auto" style={{ width: "100%"}}>
                            <div className="form-group">
    
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="begining"> <b>Photo de la plante : </b> </label>
                                <img src={infosusers.image_data} alt="" style={{ width: "100%"}}/>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="begining"> <b>Date de la garde : </b> </label>
                                <p>Début : {moment(infosusers.begining).locale('fr').format('DD MMMM YYYY HH [h] mm ')}
                                    <br/>
                                    Fin : {moment(infosusers.finish).locale('fr').format('DD MMMM YYYY HH [h] mm ')}
                                </p>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="nom_prenom"><b> Nom &amp; Prénom : </b> </label>
                                <p>{infosusers.name} {infosusers.firstname}</p>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email"><b> Email : </b> </label>
                                <p>{infosusers.email}</p>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="phone"><b> Téléphone : </b> </label>
                                <p>{infosusers.phone}</p>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <Link className="btn" type="submit" style={{ color: 'white', backgroundColor: 'green' }} onClick={handleOnClick} to="/">Valider</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    
        </>
    );
    
}
export default Garde;