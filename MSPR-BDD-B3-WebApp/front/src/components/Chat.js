import React, { useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import axios from 'axios'
import { Box, Heading, Flex, Text, List, ListItem, Input, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Button, Center, Icon } from "@chakra-ui/react"
import { ArrowForwardIcon, ChatIcon } from "@chakra-ui/icons"
import backgroundImage from "../styles/image.png"

function Chat() {
  const [clientId, setClientId] = useState(
    window.sessionStorage.getItem('access_token')
  )

  const decoded_token = jwt_decode(clientId)
  const [websckt, setWebsckt] = useState()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [currentUser, setCurrentUser] = useState({ name: "", firstname: "" })
  const [connectedUsers, setConnectedUsers] = useState([])
  const baseUrl = process.env.REACT_APP_API_URL

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    let ws = new WebSocket(`ws://127.0.0.1:8000/ws/${decoded_token.user_id}`)
    setWebsckt(ws)

    const handleOpen = () => {
      ws.send()
    }

    const handleMessage = (e) => {
      const message = JSON.parse(e.data)
      setMessages((prevMessages) => [...prevMessages, message])
    }

    ws.addEventListener("open", handleOpen)
    ws.addEventListener("message", handleMessage)

    return () => {
      ws.removeEventListener("open", handleOpen)
      ws.removeEventListener("message", handleMessage)
      ws.close()
    }
  }, [decoded_token.user_id])

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const accessToken = window.sessionStorage.getItem("access_token")
        const decoded_token_user = jwt_decode(accessToken)

        const response = await axios.get(`${baseUrl}/users/${decoded_token_user.user_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).catch(error => {
          console.log(error)
        })
        setCurrentUser(response.data.Person[0])

        const connectedUsersResponse = await axios.get(`${baseUrl}/get_all_users_connected`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).catch(error => {
          console.log(error)
        })
        setConnectedUsers(connectedUsersResponse.data["User Connected"])
      } catch (error) {
        console.error(error)
      }
    }

    fetchCurrentUser()
  }, [baseUrl])

  const getRoleName = (roleId) => {
    if (roleId === 2) {
      return 'User'
    } else if (roleId === 1) {
      return 'Botaniste'
    } else if (roleId === 3) {
      return 'Hybride'
    }
  }

  const handleSendMessage = (event) => {
    event.preventDefault()

    if (websckt.readyState === WebSocket.OPEN) {
      const messageObj = {
        message: message,
        name: currentUser.name,
        firstname: currentUser.firstname,
        role: currentUser.id_role // Ajoutez l'ID de rôle ici
      }

      websckt.send(JSON.stringify(messageObj))
      setMessage('')
    } else {
      console.error('WebSocket connection is not open.')
    }
  }

  return (
    <Box
      bgImage={`url(${backgroundImage})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      minH="100vh"
      pt={["20px", "100px"]}
      pb="40px"
      px="20px"
      overflowX="hidden"
    >
      <Box bg="rgba(255, 255, 255, 0.85)" p={4}>
        <Flex justifyContent="space-between" alignItems="center" flexDirection={["column", "column", "row"]}>
          <Heading as="h1" mb={4}>Bienvenue sur le A'Ro-Chat !</Heading>
        </Flex>
        <Box position="fixed" right={5} bottom={["20px", "100px"]}>
          <Button 
            bg="rgba(149, 102, 87, 1)" 
            color='white' 
            mt={[4, 4, 0]} 
            onClick={onOpen} 
            size="md" 
            rounded="full"
            _hover={{
              background: "rgba(149, 102, 87, 0.8)", 
            }}
          >
            <Center>
              <Icon as={ChatIcon} />
            </Center>
          </Button>
        </Box>

        <Drawer isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent bg="rgba(149, 102, 87, 1)" color='white'>
              <DrawerCloseButton />
              <DrawerHeader>Utilisateurs connectés:</DrawerHeader>
              <DrawerBody>
                <List>
                  {connectedUsers.map(user => (
                    <ListItem key={user.id_person} as="h5">
                      {user.firstname} {user.name}
                    </ListItem>
                  ))}
                </List>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>

        <Box className="chat-container">
          <Box className="chat">
            {messages.map((value, index) => {
              try {
                const messageObject = JSON.parse(value.message)
                return (
                  <Box key={index} className="message-container" bg="rgba(0, 128, 1, 0.50)" p={2} mb={2}>
                    <Text className="message" as='h6'>
                      {messageObject.firstname} {messageObject.name} ({getRoleName(messageObject.role)}): {messageObject.message}
                    </Text>
                  </Box>
                )
              } catch (e) {
                console.error(`Failed to parse message: ${value.message}`)
              }
            })}
          </Box>

          <Box className="input-chat-container" mt={4} display="flex" alignItems="center" justifyContent="space-between">
            <form onSubmit={handleSendMessage} style={{ width: "100%" }}>
              <Input
                borderColor="green"
                focusBorderColor="green"
                flex="1"
                type="text"
                placeholder="Chat message ..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                mr={2}
              />
            </form>
            <IconButton
              m={2}
              type="submit"
              aria-label="Send"
              icon={<ArrowForwardIcon />}
              backgroundColor="rgba(0, 128, 1, 0.50)"
              onClick={handleSendMessage}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Chat