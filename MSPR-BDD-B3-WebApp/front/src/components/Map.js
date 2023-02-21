import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from "axios";
import '../styles/Map.css';

function Map(props) {

  const [plants, setPlants] = useState([]);
  const positionLille = [50.629250, 3.057256];
  const baseUrl = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/plant`);
        const plantsData = response.data.Plants;
        setPlants(plantsData);
        console.log(plantsData)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {plants.map(plant => (
              <Marker key={plant.id_plante} position={[plant.latitude, plant.longitude]}>
                <Popup>
                  {plant.name}
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
