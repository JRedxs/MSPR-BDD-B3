import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, useDisclosure, Stack } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import jwt_decode from "jwt-decode";


const Header = () => {
    const navigate = useNavigate();
    const { isOpen, onToggle } = useDisclosure();


    const handleLogout = () => {

    
        // Récupère l'ID utilisateur à partir du sessionStorage
        const clientId = window.sessionStorage.getItem("access_token");
    
        const decoded_token = jwt_decode(clientId);
        const userId = decoded_token.user_id;
    
        console.log('YOUPI', userId)
        // Envoie la requête de déconnexion
        fetch(`/disconnect_user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Effectuer les autres actions de déconnexion
        })
        .catch(error => {
            console.error(error);
            // Gérer l'erreur de déconnexion
        });

        window.sessionStorage.removeItem('access_token');
        setIsOpen(false);  // Ferme le menu si ouvert
        navigate('/login');  // Redirige vers la page de connexion
    };
    
    const isLoggedIn = !!window.sessionStorage.getItem('access_token');
    


    return (
        <Box as="header" p={4} bg="green" color="white">
            <Flex justifyContent="space-between" alignItems="center">
                <RouterLink to="/">
                    <Heading>Arosa-Je</Heading>
                </RouterLink>
                <Flex>
                    {isLoggedIn ? (
                        <>
                            <Button as={RouterLink} to="/Map" colorScheme="green" variant="outline" mr={2}>
                                Garder une plante
                            </Button>

                            <Button as={RouterLink} to="/SearchPlant" colorScheme="green" variant="outline" mr={2}>
                                Rechercher une plante
                            </Button>

                            <Menu>
                                <MenuButton as={Button} colorScheme="green" rightIcon={<ChevronDownIcon />}>
                                    <FaUser />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem as={RouterLink} to="/UserProfil">
                                        Profil
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
                                </MenuList>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Stack direction="row">
                                <Button as={RouterLink} to="/login" colorScheme="blue" variant="solid" mr={2}>
                                    Se connecter
                                </Button>
									<Button as={RouterLink} to="/Register" colorScheme="blue" variant="solid" mr={2}>
                                    S'inscrire
                                </Button>
                            </Stack>
                            <Avatar size="md" boxSize="3rem" src='https://bit.ly/broken-link' ml={4} />
                        </>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;