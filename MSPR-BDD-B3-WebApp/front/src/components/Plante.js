import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Center, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { GenericButton } from "../libs/Button";

function Plante(props) {
    const [plante, setPlante] = useState(null);
    let { id_plante } = useParams();

    const url = process.env.REACT_APP_API_URL + `/plantandgallery/${id_plante}`;
    const navigate = useNavigate();
    const buttonSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

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

    const openAddAdvice = (id_plante) => {
        navigate(`/AddAdvice/`);
    };

    const [reloadPlante, setReloadPlante] = useState(false);

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
                console.log(plante);
            })
            .catch((error) => console.log(error));
    }, [reloadPlante]);

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
                <Image
                    src={photo.image_data}
                    onClick={() => openAdvice(photo.id_photo)}
                />
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
                <Text
                    className=""
                    textAlign="center"
                    fontSize="2xl"
                    fontWeight="bold"
                >
                    Informations de la plante
                </Text>
                <Box
                    className="mx-auto blue-card shadow-lg rounded"
                    borderRadius="15px"
                    border="2px solid black"
                    width="30%"
                    marginTop={0}
                    marginBottom={5}
                >
                    {plante && (
                        <>
                            <Carousel showArrows={true} showThumbs={false}>
                                {renderCarouselItems()}
                            </Carousel>

                            {plante[id_plante] && (
                                <>
                                    <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                                        <p className="card-body mx-auto" style={{ color: 'black', fontSize: '20px' }}> <b>Titre du conseil: </b> {plante[id_plante].advice_title}</p>
                                    </div>
                                    <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                                        <p className="card-body mx-auto" style={{ color: 'black', fontSize: '20px' }}> <b>Conseil d'entretien: </b> {plante[id_plante].advice} </p>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    <Flex justifyContent="center" mt={4}>
                        <Center height={125}>
                            <Flex flexWrap="wrap" justifyContent="center">
                                <Box textAlign="center" mb={2} maxWidth="80%">
                                    <GenericButton
                                        label="Enregistrer une photo"
                                        colorScheme="green"
                                        onClick={openPhoto}
                                        size={buttonSize}
                                    />
                                </Box>
                                <Box textAlign="center" maxWidth="80%">
                                    <GenericButton
                                        label="Enregistrer une demande de garde"
                                        colorScheme="green"
                                        onClick={openGarde}
                                        size={buttonSize}
                                    />
                                </Box>
                                <Box textAlign="center" maxWidth="80%">
                                    <GenericButton
                                        label="Ajouter un conseil"
                                        colorScheme="green"
                                        onClick={() => openAddAdvice(id_plante)}
                                        size={buttonSize}
                                    />
                                </Box>
                            </Flex>
                        </Center>
                    </Flex>
                </Box>
            </Box>
        </>
    );
}

export default Plante;