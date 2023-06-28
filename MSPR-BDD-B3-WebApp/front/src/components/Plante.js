import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/Plantes.css';
import axios from "axios";


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
        const accessToken = window.sessionStorage.getItem("access_token");
        axios.get(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((response) => response.data)
            .then((data) => {
                setPlante(data[0].Plante);
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
                    <div className="d-flex justify-content-center">
                        <img className="m-1" key={plante[photo].id_photo} src={plante[photo].image_data} onClick={() => { openAdvice(plante[photo].id_photo) }} />
                    </div>
                );
            }
            else {
                console.log("photo avec conseil", plante[photo].id_photo);
                jsx.push(
                    <div className="d-flex justify-content-center" key={plante[photo].id_photo}>
                        <img  className="justify-content-center m-3" key={plante[photo].id_photo} src={plante[photo].image_data} />
                        <h2>{plante[photo].advice_title}</h2>
                        <p>{plante[photo].advice}</p>
                    </div>
                );
            }
        }
        return jsx;
    };
    if (!plante) {
        return <div className="alert alert-danger d-flex justify-content-center">
                    <h1>Aucune donnée...</h1>
               </div>;
    }

    return (
        <>
            <div className="body">
                <div className="container">
                    <h1 className='mb-5 mb-3' style={{ textAlign: 'center' }}>
                        <b> Informations de la plante</b>
                    </h1>
                    <div className="card card-login mx-auto blue-card shadow-lg bg-white rounded" style={{ borderRadius: "15px", border: "2px solid black", width: '50%', marginTop: 0, marginBottom: 0 }}>
                        {plante && jsxPhoto()}
                        <div className="card-body mx-auto">
                            <div className="d-flex justify-content-center margin-login-card" style={{ height: 125 }}>
                                <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                                    <div className="m-1">
                                    <button className='btn btn-success' onClick={openPhoto}>Enregistrer une photo</button>
                            </div>
                                </div>
                                <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                                    <button className='btn btn-success' onClick={openGarde}>Enregistrer une demande de garde</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Plante;

