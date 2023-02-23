import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";

function SearchPlant() {
    const [plants, setPlants] = useState([]);
    const navigate = useNavigate();
    const url = `http://127.0.0.1:8000/plant/`;

    const openPlante = (id_plante) => () => {
        navigate(`/Plante/${id_plante}`);
    }

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setPlants(response.data.Plants);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {plants.map(plant => (
                <div key={plant.id_plante}>

                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://img.ltwebstatic.com/images3_pi/2021/08/15/1629033033ff815394c0d95f7b674a1348b7660bb9.webp" />
                        <Card.Body>
                            <Card.Title style={{ marginBottom: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}><h2>{plant.name}</h2></Card.Title>
                        </Card.Body>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item style={{ marginBottom: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}><p>Adresse: {plant.road_first}</p></ListGroup.Item>
                            <ListGroup.Item style={{ marginBottom: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}><p>Ville : {plant.town}</p></ListGroup.Item>
                            <ListGroup.Item style={{ marginBottom: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}><p>Code Postal: {plant.postal_code}</p></ListGroup.Item>
                            <Card.Body>
                            </Card.Body>

                            <Card.Body>
                                <Card.Link style={{ marginBottom: "0px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={openPlante(plant.id_plante)}>Selectionner cette plante</Card.Link>
                            </Card.Body>

                        </ListGroup>
                    </Card>

                </div>
            ))}
        </div>
    );
}

export default SearchPlant;