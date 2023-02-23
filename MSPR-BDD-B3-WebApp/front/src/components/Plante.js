import React, { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/Plantes.css';


function Plante(props) {
    const [plante, setPlante] = useState(null);
    let { id_plante } = useParams();
    console.log("id plante " ,id_plante)
    const url = `http://127.0.0.1:8000/plant/${id_plante}`;
    

    const navigate = useNavigate();
    const openAdvice = (id_plante) => () => {
        navigate(`/AddAdvice/${id_plante}`);
    }

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setPlante(data.Plante[0]);
            })
            .catch((error) => console.log(error));   
    }, [url]);

    if (!plante) {
        return <div>Aucune donnée...</div>;
    }

    return (
        <>
            <div class="d-flex flex-row ">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://img.ltwebstatic.com/images3_pi/2021/08/15/1629033033ff815394c0d95f7b674a1348b7660bb9.webp" />
                    <Card.Body>
                        <Card.Title style={{ marginBottom: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}><h2>{plante.name}</h2></Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item style={{ marginBottom: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}><h6>Entretien</h6></ListGroup.Item>
                        <ListGroup.Item style={{ marginBottom: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}><h6>Titre du conseil</h6></ListGroup.Item>
                        <ListGroup.Item style={{ marginBottom: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}><h6>Conseils </h6></ListGroup.Item>
                        <Card.Body>


                        </Card.Body>
                        <Card.Body>
                            <Card.Link style={{ marginBottom: "0px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={openAdvice(plante.id_plante)}>Ajouter un conseil d'entretien</Card.Link>
                        </Card.Body>
                    </ListGroup>
                </Card>
            </div>
        </>
    );
}

export default Plante;
