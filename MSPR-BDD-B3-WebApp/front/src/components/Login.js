import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Box, VStack, Flex, Heading, Input, FormControl, Image, Text } from "@chakra-ui/react";
import backgroundImage from '../styles/image.png';
import logo from '../styles/arosaje.png';
import { GenericButton } from "../libs/Button"

const LoginPage = () => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }

        try {
            const response = await axios.post(`${baseUrl}/token_log?email=${email}&password=${password}`);
            const access_token = response.data.access_token;
            if (access_token) {
                window.sessionStorage.setItem('access_token', access_token);
                navigate(`/SearchPlant`);
            } else {
                console.log("Incorrect email or password");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            bgImage={`url(${backgroundImage})`}
            bgRepeat="no-repeat"
            bgSize="cover"
            minH="120vh"
            pt="100px"
            w="100%"
        >
            <Flex w="100%" h="100%" p={5} alignItems="center" justifyContent="center">
                <Box w="100%" p={5} shadow="2xl" borderWidth="2px" borderRadius="md" maxW="1000px" bg="rgba(255, 255, 255, 0.85)">
                    <VStack spacing={4} align="stretch">
                        <Flex alignItems="center" justifyContent="center">
                            <Image src={logo} alt="Logo" w={["50%", "40%", "30%", "20%"]} />
                        </Flex>
                        <Heading textAlign="center" mb={5}>Connectez-vous</Heading>
                        <FormControl>
                            <Input
                                borderColor="green.900"
                                focusBorderColor="green"
                                placeholder="Enter email"
                                id="email"
                                name="email"
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                borderColor="green.900"
                                focusBorderColor="green"
                                placeholder="Enter password"
                                type="password"
                                id="password"
                                name="password"
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                            />
                        </FormControl>
                    </VStack>

                    <Flex justifyContent="center" mt={4}>
                        <Box mr={4}>
                            <GenericButton
                                loadingText="Envoi en cours"
                                label="Retour"
                                to="/Login"
                                colorScheme="green"
                            />
                        </Box>
                        <Box ml={4}>
                            <GenericButton
                                loadingText="Envoi en cours"
                                label="Valider"
                                colorScheme="green"
                                onClick={(event) => handleSubmit(event)}
                            />
                        </Box>
                    </Flex>


                    <Text mt={4} textAlign="center">
                        Pas encore de code ? Inscrivez-vous
                        <Link to="/Register" color="green.500">
                            <Text as="span" fontWeight="bold"> ici</Text>
                        </Link>

                    </Text>
                </Box>
            </Flex>
        </Box>
    );
};

export default LoginPage;
