import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import '../styles/Searchplant.css';

function SearchPlant() {
    const [plants, setPlants] = useState([]);
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL + `/plant/`;

    const openPlante = (id_plante) => {
        navigate(`/Plante/${id_plante}`);
    }
    const openPlanteRegister = () => {
        navigate(`/RegisterPlante`);
    }
    
    useEffect(() => {
        window.sessionStorage.removeItem("plante");
        axios.get(url)
            .then(response => {
                setPlants(response.data.Plants);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>

            <div className='plants-container d-flex align-items-center justify-content-center'>
                {plants.map((plant) => (
                    <div key={plant.id_plante} style={{ margin: '10px' }}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant='top' src={plant.image_data} />
                            <Card.Body>
                                <Card.Title
                                    style={{
                                        marginBottom: '0px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <h2>{plant.name}</h2>
                                </Card.Title>
                            </Card.Body>
                            <ListGroup className='list-group-flush'>
                                <Card.Body>
                                    <Card.Link
                                        style={{
                                            marginBottom: '0px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => {
                                            openPlante(plant.id_plante);
                                        }}
                                    >
                                        Selectionner cette plante
                                    </Card.Link>
                                </Card.Body>
                            </ListGroup>
                        </Card>
                    </div>
                ))}

            </div>
            <div className="center-align">
                <button className='btn btn-success mb-5' onClick={openPlanteRegister}>Enregistrer une plante</button>
            </div>


        </>
    );
}
export default SearchPlant;