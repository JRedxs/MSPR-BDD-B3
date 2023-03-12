import React, { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/Plantes.css';


function Plante(props) {
    const [plante, setPlante] = useState(null);
    let {id_plante} = useParams();


    const url = process.env.REACT_APP_API_URL +  `/plantandgallery/${id_plante}`;
    

    const navigate = useNavigate();

    const openAdvice = (id_plante) => () => {
        navigate(`/AddAdvice/${id_plante}`);
    }

    const openPhoto = () => () => {
        window.sessionStorage.setItem('plante', JSON.stringify(Number(id_plante)));
        navigate(`/Photo`);
    }

    const openGarde = (id_plante) => () => {
        navigate(`/Garde/${id_plante}`);
    }

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.Plante);
                setPlante(data.Plante);
            })
            .catch((error) => console.log(error)); 
    }, [url]);

    const jsxPhoto = () => {
        let firstLoop = true;

        const jsx = [];
        for (const photo in plante){
            if (firstLoop){
                firstLoop = false;
                continue;
            }
            if (photo.advice == null || photo.advice_title == null)
            {
                console.log(plante[photo]);
                jsx.push(
                    <img key={plante[photo].id_photo} src={plante[photo].image_data}/>
                );
            }
            else {
                jsx.push(
                    <div key={plante[photo].id_photo}>
                        <img key={plante[photo].id_photo} src={plante[photo].image_data}/>
                        <h2>{plante[photo].advice_title}</h2>
                        <p>{plante[photo].advice}</p>
                    </div>
                );
            }
            
        }
        console.log(jsx);
        return jsx;
    };


    if (!plante) {
        return <div>Aucune donnée...</div>;
    }

    return (
        <>
            <div className="d-flex flex-row ">
                <h1>{plante[0].name}</h1>
            </div>
            {jsxPhoto()}
            <div>
                <button onClick={openAdvice(plante.id_plante)}>Ajouter un conseil d'entretien</button>
                <button onClick={openPhoto()}>Enregistrer une photo</button>
                <button onClick={openGarde(plante.id_plante)}>Enregistrer une demande de garde</button>
            </div>
        </>
    );
}

export default Plante;
