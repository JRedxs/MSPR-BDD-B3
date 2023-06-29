import { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchPlant() {
    const [plants, setPlants] = useState([]);
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL + "/plant/";

    const openPlante = (id_plante) => {
        navigate(`/Plante/${id_plante}`);
    };

    const openPlanteRegister = () => {
        navigate(`/RegisterPlante`);
    };

    useEffect(() => {
        window.sessionStorage.removeItem("plante");
        const accessToken = window.sessionStorage.getItem("access_token");
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                setPlants(response.data.Plants);
            })
            .catch((error) => {
                console.log(error);
                navigate(`/`);
            });
    }, []);

    return (
        <Box>
            <Flex justifyContent="center" my={5}>
                <Button colorScheme="green" size="lg" onClick={openPlanteRegister}>
                    Enregistrer une plante
                </Button>
            </Flex>

            <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
                {plants.map((plant) => (
                    <Box key={plant.id_plante} m={4} maxW="sm" borderWidth="1px" borderRadius="md" overflow="hidden">
                        <Image src={plant.image_data} alt={plant.name} />
                        <Box p={4}>
                            <Heading as="h2" size="lg" textAlign="center" mb={2}>
                                {plant.name}
                            </Heading>
                            <Flex justifyContent="center">
                                <Button colorScheme="green" onClick={() => openPlante(plant.id_plante)}>
                                    Sélectionner cette plante
                                </Button>
                            </Flex>
                        </Box>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
}

export default SearchPlant;
