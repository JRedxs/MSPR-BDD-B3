import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import jwt_decode from 'jwt-decode';
import Message from '../Message';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const baseUrl = process.env.REACT_APP_API_URL;
  const [messageIsOpen, setMessageIsOpen] = useState(false);
  const [id_contact, setId_contact] = useState(0);
  const [conversations, setConversations] = useState([]);

  const MenuConversations = ({ options, onOptionClick }) => {
    return (
      <Menu isLazy>
        <MenuButton color='rgba(0, 128, 1, 0.90)' as={Button} rightIcon={<ChevronDownIcon />}>
          Conversations
        </MenuButton>
        <MenuList zIndex="dropdown" bg="rgba(0, 128, 1, 0.90)">
          {options.map((option, index) => (
            <MenuItem color="rgba(0, 128, 1, 0.90)"  bg='white'as="h6" key={index} onClick={() => onOptionClick(option.number)}>
              {option.text}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  };

  const openMessages = (id) => {
    setId_contact(id);
    setMessageIsOpen(true);
  };

  const handleLogout = () => {
    const token = window.sessionStorage.getItem('access_token');

    if (!token) {
      console.error('No access token found.');
      return;
    }

    const decoded_token = jwt_decode(token);
    const userId = decoded_token.user_id;
    console.log(userId);
    axios
      .put(`${baseUrl}/disconnect_user/${userId}`, null, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    window.sessionStorage.removeItem('access_token');
    onClose();
    navigate('/login');
  };

  const closeMessages = () => {
    setMessageIsOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let url = process.env.REACT_APP_API_URL;
      url += '/conversations';
      const accessToken = window.sessionStorage.getItem('access_token');
      if (!accessToken) {
        return;
      }
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const conversationList = response.data[0];
          const newConversations = conversationList.map((conversation) => ({
            number: conversation[0],
            text: conversation[2],
            wasRead: conversation[1],
          }));
          setConversations(newConversations);
          console.log(newConversations);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 30000);

    document.addEventListener('new_conversation', () => {
      const contact = parseInt(window.sessionStorage.getItem('contact'));
      openMessages(contact);
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  const isLoggedIn = !!window.sessionStorage.getItem('access_token');

  const handleDrawerToggle = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  const displayButton = useBreakpointValue({ base: 'block', md: 'none' });

  return (
    <>
      <Box
        as="header"
        p={6}
        bg="rgba(0, 128, 1, 0.90)"
        color="white"
        position="sticky"
        top="0"
        zIndex="sticky"
      >
        <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <RouterLink to="/">
            <Heading>
              <b>Arosa-Je</b>
            </Heading>
          </RouterLink>
          <Flex>
            {isLoggedIn ? (
              <Box display={displayButton}>
                <MenuDrawer />
              </Box>
            ) : (
              <>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={6} align="center">
                  <Button colorScheme="teal" variant="outline" onClick={() => navigate('/login')}>
                    Connexion
                  </Button>
                  <Button colorScheme="teal" variant="solid" onClick={() => navigate('/signup')}>
                    Inscription
                  </Button>
                </Stack>
              </>
            )}
          </Flex>
        </Flex>
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent bg="rgba(0, 128, 1, 0.90)">
          <DrawerCloseButton mt={12} fontWeight="bold" color="white" />
          <DrawerBody>
            <Stack direction="column">
              <Avatar
                size="xl"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                alt="User avatar"
              />
              <MenuConversations
                options={conversations}
                onOptionClick={(contactId) => {
                  openMessages(contactId);
                }}
              />
              <Button colorScheme="teal" variant="solid" onClick={handleLogout}>
                Déconnexion
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {messageIsOpen && <Message isOpen={messageIsOpen} id_contact={id_contact} onClose={closeMessages} />}
    </>
  );
};

export default Header;