import React, { useState, useRef } from 'react';

function RegisterPlante(){
// Mini backlog des fonctionnalités à réalisées:
// - utilisation du sessions storage
// - Vérification de l'existence de l'addresse (bonus)
// - Determination des latitudes et longitudes
// - Ouverture de la prise de photo
// - Sauvegarde de la photo en background avec retour ici
// - Appel Api pour upload la plante
// - 
    const [name,setName] = useState("Nom de la plante");
    const  [number, setNumber] = useState("Numero");
    const  [road, setRoad] = useState("Rue");
    const  [complement, setComplement] = useState("Complement");
    const  [town, setTown] = useState("Ville");
    const  [code, setCode] = useState("Code Postal");

    return (
        <div> 
            <h1>Enregistrer une Plante</h1>
            <form>
                <div>
                    <label>Nom de la plante :</label>
                    <input type="text" value={name} onChange={event => setName(event.target.value)}/>
                </div>
                <div>
                    <label>Numero :</label>
                    <input type="text" value={number}/>
                </div>
                <div>
                    <label>Rue :</label>
                    <input type="text" value={road}/>
                </div>
                <div>
                    <label>Complément d'Adresse :</label>
                    <input type="text" value={complement}/>
                </div>
                <div>
                    <label>Ville :</label>
                    <input type="text" value={town}/>
                </div>
                <div>
                    <label>Code Postal :</label>
                    <input type="text" value={code}/>
                </div>
                <div>
                    <input type="button" value="Photo"/>
                </div>
                <div>
                    <input type="button" value="Upload"/>
                </div>
            </form>
        </div>
    );
};

export default RegisterPlante;