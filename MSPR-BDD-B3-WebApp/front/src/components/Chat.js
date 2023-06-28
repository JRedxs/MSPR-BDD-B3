import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function Chat() {
  const [clientId, setClientId] = useState(
    window.sessionStorage.getItem('access_token')
  );

  const decoded_token = jwt_decode(clientId);
  console.log(decoded_token.user_id);
  const [websckt, setWebsckt] = useState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL_EC2;

  useEffect(() => {
    const url = `ws://${baseUrl}/ws/${decoded_token.user_id}`;
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      ws.send("Connect");
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    setWebsckt(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
  
    if (websckt.readyState === WebSocket.OPEN) {
      websckt.send(message); // Envoyer directement le contenu du message sans JSON.stringify
      setMessage('');
    } else {
      console.error('WebSocket connection is not open.');
    }
  };

  return (
    <div className="container">
      <h1>Chat</h1>
      <h2>Your client ID: {decoded_token.user_id}</h2>
      <div className="chat-container">
        <div className="chat">
          {messages.map((value, index) => {
            if (value.client_id === decoded_token.user_id) {
              return (
                <div key={index} className="my-message-container">
                  <div className="my-message">
                    <p className="client">ID : {decoded_token.user_id}</p>
                    <p className="message">Message de {decoded_token.user_id} : {value.message}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="another-message-container">
                  <div className="another-message">
                    <p className="client">ID : {value.client_id}</p>
                    <p className="message">Message de {decoded_token.user_id} : {value.message}</p>
                  </div>
                </div>
              );
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
  );
}

export default Chat;
