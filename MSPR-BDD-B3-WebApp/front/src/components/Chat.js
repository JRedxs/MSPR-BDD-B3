import React, { useState, useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


function Chat() {
  const [clientId, setClientId] = useState(
    window.sessionStorage.getItem("access_token")
  );

  const NAVIGATE = useNavigate()


  const decoded_token = jwt_decode(clientId);
  const [websckt, setWebsckt] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const chatContainerRef = useRef(null);

  useEffect(() => {
    const url = "ws://localhost:8000/ws/" + decoded_token.user_id;
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      ws.send("");
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    setWebsckt(ws);

    // Fetch connected users
    fetchConnectedUsers();

    return () => ws.close();
  }, []);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const fetchConnectedUsers = async () => {
    try {
      const response = await fetch("http://ec2-15-237-62-48.eu-west-3.compute.amazonaws.com:8005/connected-users");
      const data = await response.json();
      setConnectedUsers(data.connected_users);
    } catch (error) {
      console.log("Error fetching connected users:", error);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      websckt.send(message);
      setMessage("");
    }
  };

  const handleUserSelect = (e) => {
    setSelectedUser(e.target.value);
  };

  const startPrivateChat = () => {
    if (selectedUser) {
      console.log("Conversation privée avec", selectedUser);
      NAVIGATE("/ChatPrivate");
    }
  };

  return (
    <div className="container">
      <h1>Chat</h1>
      <h2>Votre ID : {decoded_token.user_id}</h2>
        <h3>Connected Users:</h3>
        <select onChange={handleUserSelect} value={selectedUser}>
          <option value="">Sélectionnez un utilisateur</option>
          {connectedUsers.map((user) => (
            <option key={user}>{user}</option>
          ))}
        </select>
        <button className="start-chat" onClick={startPrivateChat}>
          Démarrer une conversation privée
        </button>
      <div className="chat-container" ref={chatContainerRef}>
        <div className="chat">
          {messages.map((value, index) => {
            if (value.client_id === decoded_token.user_id) {
              return (
                <div key={index} className="my-message-container">
                  <div className="my-message">
                    <p className="client">Message de : {value.client_id}</p>
                    <p className="message">{value.message}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="another-message-container">
                  <div className="another-message">
                    <p className="client">Message de : {value.client_id}</p>
                    <p className="message">&nbsp; {value.message}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="input-chat-container">
        <input
          className="input-chat"
          type="text"
          placeholder="Chat message ..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="submit-chat" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
