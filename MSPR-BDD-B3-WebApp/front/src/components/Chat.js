import React, { useState,useEffect } from "react";
import jwt_decode from "jwt-decode";

function Chat() {
 // add random cliend id by date time
 const [clientId, setClientId] = useState(
    window.sessionStorage.getItem('access_token')
  );

  const decoded_token = jwt_decode(clientId)
  console.log(decoded_token.user_id)
  const [websckt, setWebsckt] = useState();
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL
  useEffect(() => {
    const url = "ws://ec2-15-237-81-71.eu-west-3.compute.amazonaws.com:8000/ws/" + decoded_token.user_id;
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      ws.send("Connect");
    };

    // recieve message every start page
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages([...messages, message]);
    };

    setWebsckt(ws);
    //clean up function when we close page
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    websckt.send(message);
    // recieve message every send message
    websckt.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages([...messages, message]);
    };
    setMessage([]);
  };

  return (
    <div className="container">
      <h1>Chat</h1>
      <h2>your client id: {decoded_token.user_id} </h2>
      <div className="chat-container">
        <div className="chat">
          {messages.map((value, index) => {
            if (value.clientId === clientId) {
              return (
                <div key={index} className="my-message-container">
                <div className="my-message">
                  <p className="client">client id : {decoded_token.user_id}</p>
                  <p className="message">{value.message}</p>
                </div>
              </div>
              );
            } else {
              return (
                <div key={index} className="another-message-container">
                  <div className="another-message">
                    <p className="client">client id : {decoded_token.user_id}</p>
                    <p className="message">{value.message}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="input-chat-container">
        <input
            className="input-chat"
            type="text"
            placeholder="Chat message ..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></input>
          <button className="submit-chat" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
export default Chat;