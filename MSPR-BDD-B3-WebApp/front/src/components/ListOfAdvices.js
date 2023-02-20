import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const ListOfAdvices = () => {
    const [advice, setAdvice] = useState([]);

    const requestAxios = () => {
        axios.get('http://127.0.0.1:8000/advices')
            .then(response => {
                setAdvice(response.data.Person)
                console.log(response.data.Person)

            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        requestAxios();

    }, []);

    return (
        <>

            <div class="d-flex flex-row">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://img.ltwebstatic.com/images3_pi/2021/08/15/1629033033ff815394c0d95f7b674a1348b7660bb9.webp" />
                    <Card.Body>
                        <Card.Title>Monstera</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Localisation</ListGroup.Item>
                        <ListGroup.Item>Propiétaire</ListGroup.Item>
                        <ListGroup.Item>Encore du blabla</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Conseils d'entretien</Card.Link>
                        <Card.Link href="#">Ajouter un conseil</Card.Link>
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://img.ltwebstatic.com/images3_pi/2021/08/15/1629033033ff815394c0d95f7b674a1348b7660bb9.webp" />
                    <Card.Body>
                        <Card.Title>Monstera</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Localisation</ListGroup.Item>
                        <ListGroup.Item>Propiétaire</ListGroup.Item>
                        <ListGroup.Item>Encore du blabla</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link >Conseils d'entretien</Card.Link>
                        <Link to="./AddAdvice">
                        <Card.Link className="card-link">Ajouter un conseil</Card.Link>
                        </Link>
                        
                    </Card.Body>
                </Card>
              

            </div>
        </>
    );
};

export default ListOfAdvices;
