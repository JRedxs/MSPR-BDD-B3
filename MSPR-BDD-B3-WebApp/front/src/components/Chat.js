import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from 'axios';

function Chat() {
  const [clientId, setClientId] = useState(
    window.sessionStorage.getItem('access_token')
  );

  const decoded_token = jwt_decode(clientId);
  const [websckt, setWebsckt] = useState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({name:"",firstname:""});
  const baseUrl = process.env.REACT_APP_API_URL;
  

  useEffect(() => {
    const url = `ws://${baseUrl}/ws/${decoded_token.user_id}`;
    const ws = new WebSocket(url);
    ws.onopen = () => {
      ws.send("is Connect");
    };
  
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
  
    setWebsckt(ws);
  
    const fetchCurrentUser = async () => {
      try {
        const accessToken = window.sessionStorage.getItem("access_token");
        const response = await axios.get(`${baseUrl}/user/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).catch(error => {
          console.log(error);
        });
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchCurrentUser();

  }, []);

  const RoleName = () => {
    if (decoded_token.id_role === 2) {
      return 'User';
    } else if (decoded_token.id_role === 1) {
      return 'Botaniste';
    } else if (decoded_token.id_role === 3){
      return 'Hybride';
    }
  }

  



  const handleSendMessage = (event) => {
    event.preventDefault();

    if (websckt.readyState === WebSocket.OPEN) {
      websckt.send(message);
      setMessage('');
    } else {
      console.error('WebSocket connection is not open.');
    }
  }

  return (
    <div className="container">
      <br/>
      <h1>Chat</h1>
      <h2>Bienvenue {currentUser.name} {currentUser.firstname} sur le Chat !  </h2>
      <h2>Votre Rôle : {RoleName()}</h2>
      <div className="chat-container">
        <div className="chat">
          {messages.map((value, index) => {
            if (value.client_id === decoded_token.user_id) {
              return (
                <div key={index} className="my-message-container">
                  <div className="my-message">
                    <p className="message"> {currentUser.firstname} {currentUser.name} ({RoleName()}) : {value.message}</p>
                  </div>
                </div>
              )
            } else {
              return (
                <div key={index} className="another-message-container">
                  <div className="another-message">
                    <p className="message"> {currentUser.firstname} {currentUser.name} ({RoleName()}): {value.message}</p>
                  </div>
                </div>
              )
            }
          })}
        </div>
        <div className="input-chat-container">
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Chat message ..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
