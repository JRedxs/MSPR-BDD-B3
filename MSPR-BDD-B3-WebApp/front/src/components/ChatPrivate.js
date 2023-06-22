import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

function ChatPrivate() {
  const [clientId, setClientId] = useState(
    window.sessionStorage.getItem("access_token")
  );

  const [selectedUser, setSelectedUser] = useState();
  const decoded_token = jwt_decode(clientId);
  const userId = decoded_token.user_id;
  console.log(userId);

  const [websckt, setWebsckt] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);

  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const url =
      "ws://ec2-35-180-137-238.eu-west-3.compute.amazonaws.com:8005/ws/" +
      userId;
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      ws.send("Connect");
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onerror = (e) => {
      console.log("WebSocket error:", e);
    };

    ws.onclose = (e) => {
      console.log("WebSocket closed:", e);
    };

    setWebsckt(ws);

    return () => ws.close();
  }, [userId]);

  useEffect(() => {
    fetchConnectedUsers(); // Initial call to fetch list of connected users
  }, []);

  const fetchConnectedUsers = async () => {
    try {
      const response = await axios.get(baseUrl + "/connected-users");
      setConnectedUsers(response.data.connected_users);
    } catch (error) {
      console.log("Error fetching connected users:", error);
    }
  };

  const handleSelectUser = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      try {
        const response = await axios.post(baseUrl + "/send-private-message", {
          message: message,
          receiverId: selectedUser, // Message is sent to the selected user
          senderId: userId,
        });
        const newMessage = {
          time: response.data.time,
          clientId: userId,
          message: response.data.message,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage("");
      } catch (error) {
        console.log("Error sending message:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Private Chat</h1>
      <h2>Your client ID: {userId}</h2>
      <h3>Connected Users:</h3>
      <ul>
        {connectedUsers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <div>
        <h4>Send message to:</h4>
        <select onChange={handleSelectUser}>
          {connectedUsers.map((user) => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
        <div className="input-chat-container">
          <input
            className="input-chat"
            type="text"
            placeholder="Chat message ..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button className="submit-chat" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
      <div className="chat-container">
        <div className="chat">
          {messages.map((value, index) => {
            if (value.clientId === clientId) {
              return (
                <div key={index} className="my-message-container">
                  <div className="my-message">
                    <p className="client">Client ID: {userId}</p>
                    <p className="message">{value.message}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="another-message-container">
                  <div className="another-message">
                    <p className="client">Client ID: {value.clientId}</p>
                    <p className="message">{value.message}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}  

export default ChatPrivate;
