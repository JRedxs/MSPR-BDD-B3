import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Box, Heading, Text, List, ListItem, Input, IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function Chat() {
  const [clientId, setClientId] = useState(
    window.sessionStorage.getItem('access_token')
  );

  const decoded_token = jwt_decode(clientId);
  const [websckt, setWebsckt] = useState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: "", firstname: "" });
  const [connectedUsers, setConnectedUsers] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    let ws = new WebSocket(`ws://127.0.0.1:8000/ws/${decoded_token.user_id}`);
    setWebsckt(ws);

    const handleOpen = () => {
      ws.send();
    };

    const handleMessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.addEventListener("open", handleOpen);
    ws.addEventListener("message", handleMessage);

    return () => {
      ws.removeEventListener("open", handleOpen);
      ws.removeEventListener("message", handleMessage);
      ws.close();
    };
  }, [decoded_token.user_id]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const accessToken = window.sessionStorage.getItem("access_token");
        const decoded_token_user = jwt_decode(accessToken);

        const response = await axios.get(`${baseUrl}/users/${decoded_token_user.user_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).catch(error => {
          console.log(error);
        });
        setCurrentUser(response.data.Person[0]);

        const connectedUsersResponse = await axios.get(`${baseUrl}/get_all_users_connected`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).catch(error => {
          console.log(error);
        });
        setConnectedUsers(connectedUsersResponse.data["User Connected"]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentUser();
  }, [baseUrl]);

  const getRoleName = (roleId) => {
    if (roleId === 2) {
      return 'User';
    } else if (roleId === 1) {
      return 'Botaniste';
    } else if (roleId === 3) {
      return 'Hybride';
    }
  }

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (websckt.readyState === WebSocket.OPEN) {
      const messageObj = {
        message: message,
        name: currentUser.name,
        firstname: currentUser.firstname,
        role: currentUser.id_role // Ajoutez l'ID de rôle ici
      };

      websckt.send(JSON.stringify(messageObj));
      setMessage('');
    } else {
      console.error('WebSocket connection is not open.');
    }
  };

  return (
    <Box className="container" p={4}>
      <Heading as="h1" mb={4}>Chat</Heading>
      <Text mb={4}>Bienvenue test sur le Chat !</Text>
      <Box className="connected-users-box" border="1px solid #ccc" p={4} mb={4} maxHeight="200px" overflowY="scroll" width="200px">
        <Heading as="h2" size="md" mb={2}>Utilisateurs connectés:</Heading>
        <List>
          {connectedUsers.map(user => (
            <ListItem key={user.id_person}>
              - {user.firstname} {user.name}
            </ListItem>
          ))}
        </List>
      </Box>
      <Text mb={4}></Text>
      <Box className="chat-container">
        <Box className="chat">
          {messages.map((value, index) => {
            try {
              const messageObject = JSON.parse(value.message);
              return (
                <Box key={index} className="message-container" bg="gray.300" p={2} mb={2}>
                  <Text className="message">
                    {messageObject.firstname} {messageObject.name} ({getRoleName(messageObject.role)}): {messageObject.message}
                  </Text>
                </Box>
              );
            } catch (e) {
              // Le message n'est pas du JSON. Décidez de quoi faire ici.
              console.error(`Failed to parse message: ${value.message}`);
            }
          })}

        </Box>

        <Box className="input-chat-container" mt={4} display="flex" alignItems="center" justifyContent="space-between">
          <form onSubmit={handleSendMessage} style={{ width: "100%" }}>
            <Input
              flex="1"
              type="text"
              placeholder="Chat message ..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              mr={2}
            />
          </form>&nbsp;
          <IconButton
            type="submit"
            aria-label="Send"
            icon={<ArrowForwardIcon />}
            colorScheme="teal"
            onClick={handleSendMessage}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Chat;
