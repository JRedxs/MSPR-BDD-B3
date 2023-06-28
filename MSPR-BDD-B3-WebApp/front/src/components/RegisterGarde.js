import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import '../styles/RegisterGarde.css';

const RegisterGarde = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [garde, setGarde] = useState({
    id_plante: Number(window.sessionStorage.getItem('plante')),
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
      const gardeData = {
        id_plante: garde.id_plante,
        begining: garde.begining + ':00.000Z',
        finish: garde.finish + ':00.000Z'
      }
      event.preventDefault();
      const accessToken = window.sessionStorage.getItem("access_token");
      axios
        .post(`${baseUrl}/plants_garde`, gardeData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(res => navigate(`/Plante/${garde.id_plante}`))
        .catch(err => console.error(err));
    } catch (error) {
      console.error(error);
    }
  };


  return (

    <>
      <div className="body">
        <div className=" d-flex align-items-center justify-content-center">
          <h1><b><u>Enregister ici une demande de garde de votre plante </u></b></h1>
        </div>
        <div className="d-flex align-items-center justify-content-center mx-auto m-5">
          <div className="card card-register card-color d-flex align-items-center justify-content-center " style={{ width: "33%", borderRadius: "75px", border: "1px solid black" }}>
            <form>
              <div className=" align-items-center justify-content-center m-4">
                <label htmlFor="begining"><b>Début de la garde :</b></label>
                <input
                  className="form-control m-2 w-auto"
                  type="datetime-local"
                  id="begining"
                  name="begining"
                  onChange={handleChange}
                  value={garde.begining}
                />
              </div>
              <div className="align-items-center justify-content-center m-4">
                <label htmlFor="finish"><b>Fin de la garde :</b></label>
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
                <Link className="btn btn-success m-2" onClick={handleOnClick} to="/">Valider</Link>
                <Link className="btn btn-success m-2" type="submit" to="/">Retour</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterGarde;