import React, { useEffect, useRef, useState } from 'react';
import jwt_decode from 'jwt-decode';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const tokenUser = sessionStorage.getItem('access_token');
  const decodedToken = jwt_decode(tokenUser);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(`ws://ec2-35-180-26-255.eu-west-3.compute.amazonaws.com:8005/ws/${decodedToken.user_id}`);

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      socketRef.current.close();
    };
  }, [decodedToken.user_id]);

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (socketRef.current.readyState === WebSocket.OPEN) {
      const message = {
        user_id: decodedToken.user_id,
        text: messageText,
      };
      socketRef.current.send(JSON.stringify(message));
      setMessageText('');
    } else {
      console.error('WebSocket connection is not open.');
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>ID {message.client_id} : {message.message}</div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
