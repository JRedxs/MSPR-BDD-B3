import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/Plantes.css';


function Plante(props) {
    const [plante, setPlante] = useState(null);
    let { id_plante } = useParams();


    const url = process.env.REACT_APP_API_URL + `/plantandgallery/${id_plante}`;


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
    }, []);

    const jsxPhoto = () => {
        let firstLoop = true;

        const jsx = [];
        for (const photo in plante) {
            if (firstLoop) {
                firstLoop = false;
                continue;
            }
            if (plante[photo].advice == null || plante[photo].advice_title == null) {
                console.log("photo seule", plante[photo].id_photo);
                jsx.push(
                    <img key={plante[photo].id_photo} alt="" src={plante[photo].image_data} onClick={() => { openAdvice(plante[photo].id_photo) }} />
                );
            }
            else {
                console.log("photo avec conseil", plante[photo].id_photo);
                jsx.push(
                    <div key={plante[photo].id_photo}>
                        <img key={plante[photo].id_photo} alt="" src={plante[photo].image_data} />
                        <h2>Titre : {plante[photo].advice_title}</h2>
                        <p>Conseil : {plante[photo].advice}</p>
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
            <div className="body">
                <div className="container">
                    <h1 style={{ textAlign: 'center' }}>
                        <b> Informations de la plante</b>
                    </h1>
                    <div className="card card-login mx-auto blue-card shadow-lg bg-white rounded" style={{ borderRadius: "15px", border: "2px solid black", width: '50%', marginTop: 0, marginBottom: 0 }}>
                        {plante && jsxPhoto()}
                    
                        <div className="button-container">
                            <button className='btn btn-success mb-5' onClick={openPhoto}>Enregistrer une photo</button>
                            <button className='btn btn-success mb-5' onClick={openGarde}>Enregistrer une demande de garde</button>
                        </div>
                    </div>

                </div>
            </div>




        </>
    );
}

export default Plante;