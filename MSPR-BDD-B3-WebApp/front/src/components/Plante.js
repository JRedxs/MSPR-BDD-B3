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

    const openAdvice = (id_photo) => {
        window.sessionStorage.setItem('photo', JSON.stringify(Number(id_photo)));
        navigate(`/AddAdvice`);
    }

    const openPhoto = () => {
        navigate(`/Photo`);
    }

    const openGarde = () => {
        navigate(`/RegisterGarde`);
    }

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setPlante(data.Plante);
                window.sessionStorage.setItem('plante', JSON.stringify(Number(id_plante)));
                window.sessionStorage.removeItem('photo');
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
            if (plante[photo].advice == null || plante[photo].advice_title == null)
            {
                console.log("photo seule", plante[photo].id_photo);
                jsx.push(
                    <img key={plante[photo].id_photo} src={plante[photo].image_data} onClick={() => {openAdvice(plante[photo].id_photo)}}/>
                );
            }
            else {
                console.log("photo avec conseil", plante[photo].id_photo);
                jsx.push(
                    <div key={plante[photo].id_photo}>
                        <img key={plante[photo].id_photo} src={plante[photo].image_data}/>
                        <h2>{plante[photo].advice_title}</h2>
                        <p>{plante[photo].advice}</p>
                    </div>
                );
            }
            
        }
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
            { plante && jsxPhoto() }
            <div>
                <button onClick={openPhoto}>Enregistrer une photo</button>
                <button onClick={openGarde}>Enregistrer une demande de garde</button>
            </div>
        </>
    );
}

export default Plante;
