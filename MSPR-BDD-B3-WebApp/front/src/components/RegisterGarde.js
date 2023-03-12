import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';
import '../styles/RegisterGarde.css';

const RegisterGarde = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [garde, setGarde] = useState({
    id_garde: 15, //id_garde AI , mais on doit l'ajouter en dur , correctif à apporter
    id_plante: 5, //id_plante, attente d'avoir la data de la person pour chercher l'id plante 
    begining: "",
    finish: ""                
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGarde(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnClick = (event) => {
    try {  
      event.preventDefault();
      const add_garde = axios
        .post(`${baseUrl}/plants_garde`, garde)
        .then(res => console.log(res))
        .catch(err => console.error(err));
      console.log(add_garde.data);
      navigate("/Map");
    } catch(error) {
      console.error(error);
    }
  };


  return (

    <>
           
            <div className="d-flex align-items-center justify-content-center mx-auto m-5">
            <div className="card card-register card-color d-flex align-items-center justify-content-center " style={{ width: "33%", borderRadius: "75px", border: "1px solid black" }}>
                <form>
                <div>
                    <label htmlFor="begining">Début de la garde :</label>
                    <input
                    className="form-control m-2 w-auto"
                    type="datetime-local"
                    id="begining"
                    name="begining"
                    onChange={handleChange}
                    value={garde.begining}
                    />
                </div>
                <div>
                    <label htmlFor="finish">Fin de la garde :</label>
                    <input
                    className="form-control m-2 w-auto"
                    type="datetime-local"
                    id="finish"
                    name="finish"
                    onChange={handleChange}
                    value={garde.finish}
                    />
                </div>
                <div className="d-flex align-items-center justify-content-center m-3">
                    <Link className="btn btn-success " onClick={handleOnClick} to="/Map">Valider</Link>
                    <Link className="btn btn-success " type="submit" to="/">Retour</Link>
                </div>
                </form>
            </div>
          </div>
    </>
  );
};

export default RegisterGarde;
