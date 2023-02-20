import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPlante(){
// Mini backlog des fonctionnalités à réalisées:
// - utilisation du sessions storage DONE
// - Vérification de l'existence de l'addresse (bonus)
// - Determination des latitudes et longitudes -> Enzo et Rémi s'en occuppe
// - Ouverture de la prise de photo DONE
// - Sauvegarde de la photo en background avec retour ici DONE
// - Appel Api pour upload la plante
// - preparer un moyen de vider le local storage

    const [name,setName] = useState( JSON.parse(window.sessionStorage.getItem('name')) || "Nom de la plante");
    const  [number, setNumber] = useState( JSON.parse(window.sessionStorage.getItem('number')) || "Numero");
    const  [road, setRoad] = useState( JSON.parse(window.sessionStorage.getItem('road')) || "Rue");
    const  [complement, setComplement] = useState( JSON.parse(window.sessionStorage.getItem('complement')) || "Complement");
    const  [town, setTown] = useState( JSON.parse(window.sessionStorage.getItem('town')) || "Ville");
    const  [code, setCode] = useState( JSON.parse(window.sessionStorage.getItem('code')) || "Code Postal");
    const  [photo, setPhoto] = useState( JSON.parse(window.sessionStorage.getItem('photo')) || null);
    
    const baseUrl = "http://127.0.0.1:8000";
    
    const navigate = useNavigate();

    const changeName = (event) => {
        window.sessionStorage.setItem('name', JSON.stringify(event.target.value));
        setName(event.target.value);
    }

    const changeNumber = (event) => {
        window.sessionStorage.setItem('number', JSON.stringify(event.target.value));
        setNumber(event.target.value);
    }

    const changeRoad = (event) => {
        window.sessionStorage.setItem('road', JSON.stringify(event.target.value));
        setRoad(event.target.value);
    }

    const changeComplement = (event) => {
        window.sessionStorage.setItem('complement', JSON.stringify(event.target.value));
        setComplement(event.target.value);
    }

    const changeTown = (event) => {
        window.sessionStorage.setItem('town', JSON.stringify(event.target.value));
        setTown(event.target.value);
    }

    const changeCode = (event) => {
        window.sessionStorage.setItem('code', JSON.stringify(event.target.value));
        setCode(event.target.value);
    }

    const openPhoto = () => {
        navigate("/FirstPhoto");
    }
/*
    const uploadPlante = () => {
        async function postPhoto(){
            await axios.post(`${baseUrl}/image`, {id_plante: idPlante, data: imageSrc})
            // need to become a real error managment
              .then(res => console.log(res) )
              .catch(err => console.error(err));
          }
          async function postPlante(){
            await axios.post(`${baseUrl}/image`, {id_plante: idPlante, data: imageSrc})
            // need to become a real error managment
              .then(postPhoto() )
              .catch(err => console.error(err));
          }
    }
*/
    // Cette fonction va peut-être être activée ailleurs
    const cleanSession = () => {
        window.sessionStorage.removeItem("name");
        window.sessionStorage.removeItem("number");
        window.sessionStorage.removeItem("road");
        window.sessionStorage.removeItem("complement");
        window.sessionStorage.removeItem("town");
        window.sessionStorage.removeItem("code");
        window.sessionStorage.removeItem("photo");
    }

    return (
        <div> 
            <h1>Enregistrer une Plante</h1>
            <form>
                <div>
                    <label>Nom de la plante :</label>
                    <input type="text" value={name} onChange={changeName }/>
                </div>
                <div>
                    <label>Numero :</label>
                    <input type="text" value={number} onChange={changeNumber }/>
                </div>
                <div>
                    <label>Rue :</label>
                    <input type="text" value={road} onChange={changeRoad }/>
                </div>
                <div>
                    <label>Complément d'Adresse :</label>
                    <input type="text" value={complement} onChange={changeComplement }/>
                </div>
                <div>
                    <label>Ville :</label>
                    <input type="text" value={town} onChange={changeTown }/>
                </div>
                <div>
                    <label>Code Postal :</label>
                    <input type="text" value={code} onChange={changeCode }/>
                </div>
                <div>
                    <input type="button" value="Photo" onClick={openPhoto}/>
                </div>
                <div>
                    <input type="button" value="Upload"/>
                </div>
            </form>
            { photo && (<img src={photo} alt="" />)}
        </div>
    );
};

export default RegisterPlante;