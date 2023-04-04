import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // import de react-leaflet pour afficher la carte
import axios from "axios"; // import de axios pour faire des appels API
import '../styles/Map.css'; // import de la feuille de style CSS

function Map() {

  //const [plants, setPlants] = useState([]); // initialise l'état "plants" à un tableau vide
  const [users, setUsers] = useState([]);
  const positionLille = [50.629250, 3.057256]; // position par défaut pour centrer la carte
  const baseUrl = process.env.REACT_APP_API_URL; // URL de base pour les appels API
  const NAVIGATE = useNavigate()

  useEffect(() => { // Hook d'effet pour effectuer des appels API au chargement du composant
    const fetchData = async () => { // fonction asynchrone pour effectuer l'appel API
      try {
        const accessToken = window.sessionStorage.getItem("access_token");
        const response_user = await axios.get(`${baseUrl}/plants`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .catch(error => {   
            console.log(error);
            NAVIGATE(`/`);
        });
        const usersData = response_user.data.Person
        setUsers(usersData)
        console.log(usersData)
      } catch (error) {
        console.error(error); // affiche l'erreur dans la console en cas de problème
      }
    };
    fetchData(); // appelle la fonction fetchData()
  }, []); // les crochets vides indiquent que le hook d'effet ne doit être appelé qu'une fois au chargement du composant
  return (
    <>
      <div className="body">
      <div className="global-wrapper">
        <div className="title-wrapper">
          <h1 style={{ textAlign: 'center' }}>
            <u>Trouvez une plante près de chez vous :</u>
          </h1>
        </div>
        <br />
          <div className="map-wrap" style={{ marginTop: 0, marginBottom: 0 }}>
            <div className="card card-map">
              <MapContainer center={positionLille} zoom={6} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // définit l'URL pour les tuiles de la carte
                />

                {users.map(user => ( // boucle à travers les plantes pour afficher des marqueurs sur la carte
                  <Marker key={user.id_garde} position={[user.latitude, user.longitude]}>
                    <Popup>
                      {user.name_plante} <br />
                      <button style={{ borderRadius: '10px', backgroundColor: 'green', color: 'white', borderColor: 'none' }}
                        onClick={() => {
                          sessionStorage.setItem('user', JSON.stringify(user)); // ajouter les informations de l'utilisateur dans le sessionStorage
                          NAVIGATE("/Garde");
                        }}>
                        Cliquez ici!
                      </button>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Map;