import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Chat() {
  const [clientId, setClientId] = useState(
    window.sessionStorage.getItem("access_token")
  );

  const decoded_token = jwt_decode(clientId);
  const userId = decoded_token.user_id;

  const [websckt, setWebsckt] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);

  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const url =
      "ws://ec2-35-180-137-238.eu-west-3.compute.amazonaws.com:8005/ws/" +
      userId;
    const ws = new WebSocket(url);

    ws.onopen = () => {
      ws.send("Connect");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onerror = (event) => {
      console.log("WebSocket error:", event);
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };

    setWebsckt(ws);
    return () => {
      ws.close();
    };
  }, [userId]);

  useEffect(() => {
    fetchConnectedUsers();
  }, []);

  const fetchConnectedUsers = async () => {
    try {
      const response = await axios.get(baseUrl + "/connected-users");
      setConnectedUsers(response.data.connected_users);
    } catch (error) {
      console.log("Error fetching connected users:", error);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        time: new Date().toLocaleTimeString(),
        clientId: userId,
        message: message,
      };
      if (websckt && websckt.readyState === WebSocket.OPEN) {
        websckt.send(JSON.stringify(newMessage));
      }
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h1>Chat</h1>
      <h2>Your client ID: {userId}</h2>
      <h3>Connected Users:</h3>
      <ul>
        {connectedUsers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <div className="chat-container">
        <div className="chat">
          {messages.map((value, index) => (
            <div
              key={index}
              className={
                value.clientId === userId
                  ? "my-message-container"
                  : "another-message-container"
              }
            >
              <div className="message">
                <p className="client">Client ID: {value.clientId}</p>
                <p className="text">{value.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="input-chat-container">
          <input
            className="input-chat"
            type="text"
            placeholder="Chat message ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="submit-chat" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
