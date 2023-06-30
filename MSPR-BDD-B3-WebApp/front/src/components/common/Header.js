import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, useDisclosure, Stack } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FaUser } from 'react-icons/fa'
import jwt_decode from "jwt-decode"
import Message from '../Message'


const Header = () => {
    const navigate = useNavigate()
    const { isOpen, onClose } = useDisclosure()
    const baseUrl = process.env.REACT_APP_API_URL


    const handleLogout = () => {
        const clientId = window.sessionStorage.getItem("access_token")
        const decoded_token = jwt_decode(clientId)
        const userId = decoded_token.user_id
        console.log(userId)
        fetch(`${baseUrl}/disconnect_user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
        window.sessionStorage.removeItem('access_token')
        onClose()  
        navigate('/login')  
    }

    const isLoggedIn = !!window.sessionStorage.getItem('access_token')
    return (
        <>
        <Box as="header" p={12} bg="green" color="white">
            <Flex justifyContent="space-between" alignItems="center">
                <RouterLink to="/">
                    <Heading><b>Arosa-Je</b></Heading>
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
                            <Avatar size="md" boxSize="1.5rem" src='https://bit.ly/broken-link' ml={2} />
                                <MenuButton as={Button} colorScheme="green" rightIcon={<ChevronDownIcon />} borderRadius="full">
                                </MenuButton>
                                <Box borderRadius="md">
                                    <MenuList bg="green" color="white">
                                        <MenuItem as={RouterLink} to="/UserProfil">
                                            Profil
                                        </MenuItem>
                                        <MenuItem as={RouterLink} to="/Chat">
                                            Chat
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
                                    </MenuList>
                                </Box>
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
                        </>
                    )}
                </Flex>
            </Flex>
            
        </Box>
        <Message id_contact={1}/>
        </>
    )
}
export default Header
