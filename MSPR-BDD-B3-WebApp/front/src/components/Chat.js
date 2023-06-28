import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [privateUserId, setPrivateUserId] = useState('');
  const [isPrivateChat, setIsPrivateChat] = useState(false);
  const [users, setUsers] = useState([]);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8000/ws');

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getUsers();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    const clientId = window.sessionStorage.getItem('access_token');
    const decodeToken = jwt_decode(clientId);

    const message = {
      user_id: decodeToken.user_id,
      text: messageText,
      private_user_id: isPrivateChat ? privateUserId : null,
    };

    socketRef.current.send(JSON.stringify(message));
    setMessageText('');
  };

  const handlePrivateChatToggle = () => {
    setIsPrivateChat(!isPrivateChat);
  };

  const handlePrivateUserIdChange = (event) => {
    setPrivateUserId(event.target.value);
  };

  return (
    <div className="chat-container">
      <div className="users-list">
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div className="message" key={index}>
            <span className="username">{message.user_id}:</span>&nbsp;
            <span className="text">{message.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="input-container" onSubmit={handleSendMessage}>
        {isPrivateChat && (
          <input
            type="text"
            placeholder="Private User ID"
            value={privateUserId}
            onChange={handlePrivateUserIdChange}
          />
        )}
        <input
          type="text"
          placeholder="Message"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
        />
        <button type="submit">Send</button>
        <button type="button" onClick={handlePrivateChatToggle}>
          {isPrivateChat ? 'Disable Private Chat' : 'Enable Private Chat'}
        </button>
      </form>
    </div>
  );
};

export default Chat;
