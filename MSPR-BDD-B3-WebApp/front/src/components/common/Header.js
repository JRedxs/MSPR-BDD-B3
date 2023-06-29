import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, useDisclosure, Stack } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();
    const { isOpen, onToggle } = useDisclosure();

    const handleLogout = () => {
        window.sessionStorage.removeItem('access_token');
        onToggle(); // Close the menu if it's open
        navigate('/login'); // Redirect to the login page
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