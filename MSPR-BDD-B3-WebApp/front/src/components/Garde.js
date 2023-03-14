import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/fr';
import axios from "axios";
import '../styles/Garde.css'

const Garde = () => {


    const baseUrl = process.env.REACT_APP_API_URL; // URL de base pour les appels API
    const [infosusers, setUsers] = useState({});
    const [person] = useState(Number(sessionStorage.getItem('person')));

    useEffect(() => {
        // récupérer les infos depuis le sessionStorage
        const fetchData = async () => {
            try {
                const usersInfo = JSON.parse(sessionStorage.getItem('user'))
                setUsers(usersInfo);
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, []);

    const handleOnClick = async () => {
        const usersInfo = JSON.parse(sessionStorage.getItem("user"));
        try {
            const response_garde = await axios.put(
                `${baseUrl}/garde/${usersInfo.id_garde}?id_person=${person}`
            );
            const gardeData = response_garde.data;
            console.log("Garde ajouté :", gardeData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="body">
            <div className="container">
                <h1 style={{ textAlign: 'center' }}>
                    <b> Informations de la plante : </b>
                </h1>
                <div className="card card-login mx-auto blue-card shadow-lg bg-white rounded" style={{ borderRadius: "15px", border: "2px solid black", width: '50%', marginTop: 0, marginBottom: 0 }}>
                    <div className="card-body mx-auto">
                        <div className="d-flex justify-content-center margin-login-card" style={{ height: 1000 }}>
                            <form className="mx-auto">
                                <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                                    <label className="card-body mx-auto" htmlFor="begining" style={{ color: 'black', fontSize: '20px' }}> <b>Photo de la plante : </b> </label>
                                </div>
                                <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                                    <img src={infosusers.image_data} alt="" style={{ width: "55%", borderRadius: '15px', margin: 'auto' }} />
                                </div>
                                <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                                    <label className="card-body mx-auto" htmlFor="begining" style={{ color: 'black', fontSize: '20px' }}> <b>Début de la garde : </b> </label>
                                    <b><i style={{ color: 'black' }}>{moment(infosusers.begining).locale('fr').format('DD MMMM YYYY à HH [h] mm ')}</i></b>
                                </div>
                                <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                                    <label className="card-body mx-auto" htmlFor="begining" style={{ color: 'black', fontSize: '20px' }}> <b>Fin de la garde : </b> </label>
                                    <b><i style={{ color: 'black' }}>{moment(infosusers.finish).locale('fr').format('DD MMMM YYYY à HH [h] mm ')}</i></b>
                                </div>
                                <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                                    <label className="card-body mx-auto" htmlFor="begining" style={{ color: 'black', fontSize: '20px' }}> <b>Nom & Prénom : </b> </label>
                                    <b><i style={{ color: 'black' }}> {infosusers.name} {infosusers.firstname}</i></b>
                                </div>
                                <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                                    <label className="card-body mx-auto" htmlFor="begining" style={{ color: 'black', fontSize: '20px' }}> <b>Email : </b> </label>
                                    <b> <i style={{ color: 'black' }}>{infosusers.email}</i></b>
                                </div>
                                <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                                    <label className="card-body mx-auto" htmlFor="begining" style={{ color: 'black', fontSize: '20px' }}> <b>Téléphone : </b> </label>
                                    <b> <i style={{ color: 'black' }}>{infosusers.phone}</i></b>
                                </div>
                                <div className="d-flex justify-content-center align-items-center flex-column flex-md-row">
                                    <Link className="btn mb-3 mb-md-0 me-md-3" type="submit" style={{ color: 'black', backgroundColor: '#48dbfb' }} to="/Map">Retour</Link>
                                    <Link className="btn" type="submit" style={{ color: 'black', backgroundColor: '#48dbfb' }} onClick={handleOnClick} to="/">Valider</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Garde;