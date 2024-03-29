import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, useDisclosure, Stack, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody } from '@chakra-ui/react'
import { ChevronDownIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import jwt_decode from "jwt-decode"
import Message from '../Message'
import { useState, useEffect  } from 'react';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
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
                <MenuItem key={index} onClick={() => onOptionClick(option.number)}>
                  {option.text}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )
      }
    
    const openMessages = (id) => {
        setId_contact(id);
        setMessageIsOpen(true);
    };
  const handleLogout = () => {
    const token = window.sessionStorage.getItem("access_token")

    if (!token) {
      console.error("No access token found.")
      return
    }

    const decoded_token = jwt_decode(token)
    const userId = decoded_token.user_id
    console.log(userId)
    fetch(`${baseUrl}/disconnect_user/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
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

    const closeMessages = () => {
        setMessageIsOpen(false);
      };

    useEffect(() => {
        setInterval(()=>{
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
                console.log(newConversations);
            });
        }, 10000) // 30s
        document.addEventListener("new_conversation", () => {
            const contact = parseInt(window.sessionStorage.getItem('contact'));
            openMessages(contact);
        });
      }, []);

    
    const isLoggedIn = !!window.sessionStorage.getItem('access_token')
    
    const handleDrawerToggle = () => {
        if (isOpen) {
          onClose()
        } else {
          onOpen()
        }
    }

  return (
    <>
    <Box as="header" p={12} bg="green" color="white" overflowX="hidden" position="sticky" top="0" zIndex="docked">
      <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
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
              <Button as={RouterLink} to="/SearchPlant" colorScheme="green" variant="outline" mr={2}>
                Rechercher une plante
              </Button>
              <Menu>
                <MenuButton as={Button} colorScheme="green" rightIcon={<ChevronDownIcon />} borderRadius="full">
                  <Avatar size="md" boxSize="1.5rem" src='https://bit.ly/broken-link' ml={2} />
                </MenuButton>
                <MenuList bg="green" color="white">
                  <MenuItem as={RouterLink} to="/UserProfil">
                    Profil
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/Chat">
                    Chat
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Stack direction={{ base: "column", md: "row" }}>
                <Button as={RouterLink} to="/login" colorScheme="blue" variant="solid" mr={2}>
                  Se connecter
                </Button>
                <Button as={RouterLink} to="/Register" colorScheme="blue" variant="solid" mr={2}>
                  S'inscrire
                </Button>
              </Stack>
            </>
          )}
          <IconButton
            ref={btnRef}
            colorScheme="white"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={handleDrawerToggle}
            display={{ base: 'block', md: 'none' }}
            aria-label="Toggle menu"
            mr={2}
          />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent bg="rgba(0, 128, 1, 0.90)">
              <DrawerCloseButton mt={12}  fontWeight="bold" color="white"  />
              <DrawerBody>
                {isLoggedIn ? (
                  <Box mt={36}>
                    <Box mt={24} boxShadow="2xl">
                      <Button as={RouterLink} to="/Map" colorScheme="green" variant="outline" my={2} w="100%" fontWeight="bold" color="white">
                        Garder une plante
                      </Button>
                    </Box>
                    <Box mt={24} boxShadow="2xl">
                      <Button as={RouterLink} to="/SearchPlant" colorScheme="green" variant="outline" my={2} w="100%" fontWeight="bold" color="white">
                        Rechercher une plante
                      </Button>
                    </Box>
                    <Box mt={24} boxShadow="2xl">
                      <Button as={RouterLink} to="/UserProfil" my={2} w="100%" fontWeight="bold" color="white">
                        Profil
                      </Button>
                    </Box>
                    <Box mt={24} boxShadow="2xl">
                      <Button as={RouterLink} to="/Chat" my={2} w="100%" fontWeight="bold" color="white">
                        Chat
                      </Button>
                    </Box>
                    <Box mt={24} boxShadow="2xl">
                      <Button onClick={handleLogout} my={2} w="100%" fontWeight="bold" color="white">
                        Se déconnecter
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box mt={36}>
                    <Box boxShadow="2xl">
                      <Button as={RouterLink} to="/login" colorScheme="blue" variant="solid" my={2} w="100%" fontWeight="bold" color="white" boxShadow="2xl">
                        Se connecter
                      </Button>
                    </Box>
                    <Box mt={24} boxShadow="2xl">
                      <Button as={RouterLink} to="/Register" colorScheme="blue" variant="solid" my={2} w="100%" fontWeight="bold" color="white">
                        S'inscrire
                      </Button>
                    </Box>
                  </Box>

                )}
              </DrawerBody>
							</DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
    </Box>
    {messageIsOpen && id_contact && (<Message id_contact={id_contact} onClose={closeMessages}/>)}
    </>
  )
}

export default Header