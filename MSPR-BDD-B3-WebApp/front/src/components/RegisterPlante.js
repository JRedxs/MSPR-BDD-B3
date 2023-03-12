import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPlante(){

    //à mettre en props quand on relira les pages entre elles
    const  [person,setPerson] = useState( JSON.parse(window.sessionStorage.getItem('person')) || 1);
    
    const  [name,setName] = useState( JSON.parse(window.sessionStorage.getItem('name')) || '');
    const  [number, setNumber] = useState( JSON.parse(window.sessionStorage.getItem('number')) || '');
    const  [road, setRoad] = useState( JSON.parse(window.sessionStorage.getItem('road')) || '');
    const  [complement, setComplement] = useState( JSON.parse(window.sessionStorage.getItem('complement')) || '');
    const  [town, setTown] = useState( JSON.parse(window.sessionStorage.getItem('town')) || '');
    const  [code, setCode] = useState( JSON.parse(window.sessionStorage.getItem('code')) || '');
    const  [photo, setPhoto] = useState( JSON.parse(window.sessionStorage.getItem('photo')) || null);
    
    const baseUrl = process.env.REACT_APP_API_URL;
    
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

    const uploadPlante = async () => {
        // This function will be ugly and will work

        let querry = "https://api-adresse.data.gouv.fr/search/?q=";
        querry += number.toString() + "+";
        querry += road.trim().replace(' ','+') + '+';
        querry += town.trim().replace(' ','+') + '+';
        querry += code.toString();
        await axios.get(querry)
            .then( async (apiAdresseResponse) => {
                const coordinates = apiAdresseResponse.data.features[0].geometry.coordinates;
                await axios.post(`${baseUrl}/plante`, {id_person: person, name: name, number: number, road_first: road, road_second: complement, town: town, postal_code: code, latitude: coordinates[1], longitude: coordinates[0]})
                    .then( async (planteResponse) => {
                        await axios.post(`${baseUrl}/image`, {id_plante: planteResponse.data.id_plante, data: photo})
                        .then( () => {
                            //navigate here
                        })
                    })
            });

    }

    // Cette fonction va peut-être être activée ailleurs
    

    return (
        <div className="d-flex align-items-center justify-content-center mx-auto">
            <div className="card card-register card-color d-flex align-items-center justify-content-center" style={{ width: "33%", borderRadius: "75px", border: "1px solid black" }}>
                <h1>Enregistrer une Plante</h1>
                <form>
                    <div>
                        <label className="form_label">Nom de la plante :</label>
                        <input className="form-control m-2 w-auto" type="text" placeholder='Nom de votre plante' value={name} onChange={changeName }/>
                    </div>
                    <div>
                        <label className="form_label">Numero :</label>
                        <input className="form-control m-2 w-auto" type="text" placeholder='Numero' value={number} onChange={changeNumber }/>
                    </div>
                    <div>
                        <label className="form_label">Rue :</label>
                        <input className="form-control m-2 w-auto" type="text" placeholder='Rue'  value={road} onChange={changeRoad }/>
                    </div>
                    <div>
                        <label className="form_label">Complément d'Adresse :</label>
                        <input className="form-control m-2 w-auto" type="text" placeholder='Complement' value={complement} onChange={changeComplement }/>
                    </div>
                    <div> 
                        <label className="form_label">Ville :</label>
                        <input className="form-control m-2 w-auto" type="text" placeholder='Ville' value={town} onChange={changeTown }/>
                    </div>
                    <div>
                        <label className="form_label">Code Postal :</label>
                        <input className="form-control m-2 w-auto" type="text" placeholder='Code Postal' value={code} onChange={changeCode }/>
                    </div>
                    <div className='d-flex align-items-center justify-content-center mx-auto'>
                        <input className="btn btn-success form-button  " type="button" value="Photo" onClick={openPhoto}/>
                    </div>
                    <div>
                    { photo && (<input className="btn btn-success form-button  " type="button" value="Upload" onClick={uploadPlante}/>)}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPlante;