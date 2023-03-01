import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // import de react-leaflet pour afficher la carte
import axios from "axios"; // import de axios pour faire des appels API
import '../styles/Map.css'; // import de la feuille de style CSS

function Map(props) {

  const [plants, setPlants] = useState([]); // initialise l'état "plants" à un tableau vide
  const positionLille = [50.629250, 3.057256]; // position par défaut pour centrer la carte
  const baseUrl = "http://127.0.0.1:8000"; // URL de base pour les appels API
  const NAVIGATE = useNavigate();


  const handleSubmit = async (event) => {
      const response = await axios.get(`${baseUrl}/plants`);
      const user = response.data.Person;
      localStorage.setItem('user', JSON.stringify(user));
      console.log(user)
      

  }
  

  useEffect(() => { // Hook d'effet pour effectuer des appels API au chargement du composant
    const fetchData = async () => { // fonction asynchrone pour effectuer l'appel API
      try {
        const response_plant = await axios.get(`${baseUrl}/plant`); // fait un appel GET à l'URL /plant
        const plantsData = response_plant.data.Plants; // extrait les données "Plants" de la réponse
        setPlants(plantsData); // met à jour l'état "plants" avec les données extraites
        console.log(plantsData) // affiche les données dans la console
      } catch (error) {
        console.error(error); // affiche l'erreur dans la console en cas de problème
      }
    };
    fetchData(); // appelle la fonction fetchData()
  }, []); // les crochets vides indiquent que le hook d'effet ne doit être appelé qu'une fois au chargement du composant

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>
        Trouvez une plante près de chez vous :
      </h1>
      <div className="map-wrap">
        <div className="card card-map">
          <MapContainer center={positionLille} zoom={6} scrollWheelZoom={false}> 
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // définit l'URL pour les tuiles de la carte
            />

            {plants.map(plant => ( // boucle à travers les plantes pour afficher des marqueurs sur la carte
              <Marker key={plant.id_plante} position={[plant.latitude, plant.longitude]}>
                <Popup>
                    {plant.name} <br/>
                    <button style={{borderRadius: '10px', backgroundColor: 'green', color: 'white', borderColor: 'none'}} 
                      onClick={() => {
                        handleSubmit();
                        NAVIGATE("/Garde");
                      }}>Cliquez ici!</button>
              </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  )
}

export default Map;