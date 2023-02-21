import React from "react";
import { MapContainer, TileLayer, Marker,Popup} from 'react-leaflet';
import '../styles/Map.css';
// ,Marker, Popup 

function Map (props){

    const positionLille = [50.629250, 3.057256]

    const baseUrl = "http://127.0.0.1:8000"

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.get(`${baseUrl}/plant?=${email}&password=${password}`);
        const user = response.data.User;
        if (user.length > 0) {
          console.log("Plante récupérée",response);
  
        } else {
          console.log("Plante non récupérée",response);
        }
      };

    return (

        <>
        <h1 style={{textAlign: 'center'}}>
            Trouvez une plante près de chez vous :
        </h1>
            <div className="map-wrap">
                <div className="card card-map">

                    <MapContainer center={positionLille} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* {filteredStations.map(cities => (
                            <Marker
                            key = {cities.id}
                            position = {[cities.gps_lat, cities.gps_lng]}>
                            <Popup>
                                <h2>{"Name : " + cities.name}</h2>
                            </Popup>
                            </Marker>
                            
                        ))} */}
                        <Marker position={[50.6422677679524, 3.061675967234328]}
                        eventHandlers={{click: (e) => {
                            console.log('Marker clique', e)
                        }}}>
                            <Popup>
                                Localisation par défault <br /> <button style={{border: 'none'}}> <a style={{ textDecoration : 'none'}} href="/Garde">Cliquez ici</a>  </button>

                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </>
    )
}
export default Map;