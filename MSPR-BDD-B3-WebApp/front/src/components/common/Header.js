import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, useDisclosure, Stack } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FaUser } from 'react-icons/fa'
import jwt_decode from "jwt-decode"
import Message from '../Message'
import { useState, useEffect  } from 'react';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate()
    const { isOpen, onClose } = useDisclosure()
    const baseUrl = process.env.REACT_APP_API_URL
    const [ messageIsOpen, setMessageIsOpen ] = useState(false);
    const [ id_contact, setId_contact ] = useState(0);
    const [ conversations, setConversations ] = useState();

    const MenuConversations = ({ options, onOptionClick }) => {
        return (
          <Menu>
            <MenuButton as={Button} colorScheme="teal">
              Conversations
            </MenuButton>
            <MenuList>
              {options.map((option, index) => (
                <MenuItem key={index} onClick={() => onOptionClick(option.id)}>
                  {option.text}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )
      }
    
    const openMessages = (id) => {
        setId_contact(id);
    };


    useEffect(() => {
        setInterval(()=>{
            console.log(conversations);
            let url = process.env.REACT_APP_API_URL;
            url += "/conversations";
            const accessToken = window.sessionStorage.getItem("access_token");
            if (! accessToken){
                return;
            }
            axios.get(url, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                }
            }
            ).then((response) => {
                const conversationList = response.data[0];
                const newConversations=[];
                for (let index = 0; index < conversationList.length; index++){
                    newConversations.push( {number: conversationList[index][0], text: conversationList[index][2], wasRead: conversationList[index][1]});
                }
                setConversations(newConversations);
            });
        }, 1000)
      }, []);

    const handleLogout = () => {
        

        // Récupère l'ID utilisateur à partir du sessionStorage
        const clientId = window.sessionStorage.getItem("access_token");
    
        const decoded_token = jwt_decode(clientId);
        const userId = decoded_token.user_id;
    
        // Envoie la requête de déconnexion
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
                            {conversations && (<MenuConversations options={conversations} onOptionClick={openMessages}/>)}
                            <Button as={RouterLink} to="/Map" colorScheme="green" variant="outline" mr={2}>
                                Garder une plante
                            </Button>
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
        {messageIsOpen && (<Message id_contact={id_contact}/>)}
        </>
    )
}
export default Header
