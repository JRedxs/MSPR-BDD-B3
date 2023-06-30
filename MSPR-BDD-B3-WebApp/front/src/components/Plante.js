import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Center, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { GenericButton } from "../libs/Button";

function Plante(props) {
  const [plante, setPlante] = useState(null);
  let { id_plante } = useParams();

  const url = process.env.REACT_APP_API_URL + `/plantandgallery/${id_plante}`;

  const navigate = useNavigate();

  const openAdvice = (id_photo) => {
    window.sessionStorage.setItem("photo", JSON.stringify(Number(id_photo)));
    navigate(`/AddAdvice`);
  };

  const openPhoto = () => {
    navigate(`/Photo`);
  };

  const openGarde = () => {
    navigate(`/RegisterGarde`);
  };

  useEffect(() => {
    const accessToken = window.sessionStorage.getItem("access_token");
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        setPlante(data[0].Plante);
        window.sessionStorage.setItem(
          "plante",
          JSON.stringify(Number(id_plante))
        );
        window.sessionStorage.removeItem("photo");
      })
      .catch((error) => console.log(error));
  }, []);

  const renderCarouselItems = () => {
    const filteredPhotos = plante.filter((photo, index) => {
      // Ignorer la première photo et les photos avec des données manquantes
      if (index === 0 || !photo.image_data) {
        return false;
      }
      return true;
    });

    return filteredPhotos.map((photo) => (
      <div key={photo.id_photo}>
        <Image src={photo.image_data} onClick={() => openAdvice(photo.id_photo)} />
        {photo.advice_title && (
          <>
            <Text as="h2">{photo.advice_title}</Text>
            <Text>{photo.advice}</Text>
          </>
        )}
      </div>
    ));
  };

  if (!plante) {
    return (
      <Center>
        <Box className="alert alert-danger">
          <Text as="h1">Aucune donnée...</Text>
        </Box>
      </Center>
    );
  }

  return (
    <>
      <Box>
        
          <Text className="mb-5 mb-3" textAlign="center" fontSize="2xl" fontWeight="bold">
            Informations de la plante
          </Text>
          <Box
            className="card card-login mx-auto blue-card shadow-lg bg-white rounded"
            borderRadius="15px"
            border="2px solid black"
            width="50%"
            marginTop={0}
            marginBottom={0}
          >
            {plante && (
              <Carousel showArrows={true} showThumbs={false}>
                {renderCarouselItems()}
              </Carousel>
            )}
            <Flex justifyContent="center" mt={4}>
              <Center height={125}>
                
                  <Box textAlign="center">
                    <GenericButton
                      label="Enregistrer une photo"
                      colorScheme="green"
                      onClick={openPhoto}
                    />
                  </Box>
                  <Box textAlign="center">
                    <GenericButton
                      label="Enregistrer une demande de garde"
                      colorScheme="green"
                      onClick={openGarde}
                    />
                  </Box>
                
              </Center>
            </Flex>
          </Box>
        
      </Box>
    </>
  );
}

export default Plante;
