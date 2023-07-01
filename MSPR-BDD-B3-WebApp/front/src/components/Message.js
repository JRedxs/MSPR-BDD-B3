import React from 'react';
import '../styles/Message.css';
import axios from 'axios';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_contact: props.id_contact,
      isMinimized: false,
      messages: [],
      newMessage: '',
      baseUrl: process.env.REACT_APP_API_URL,
    };

    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleNewMessageChange = this.handleNewMessageChange.bind(this);
    this.toggleMinimize = this.toggleMinimize.bind(this);
    this.handleWriteConversation = this.handleWriteConversation.bind(this);
    
    this.update_clock = setInterval(()=>{
      const accessToken = window.sessionStorage.getItem("access_token");
      if (!accessToken){
        return
      }
      const url = this.state.baseUrl + `/conversation?id_contact=${this.state.id_contact}`;
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }, 
      })
        .then((response) => {
          this.handleWriteConversation(response.data[0])
        })
    }, 10000) //10s
  }

  handleSendMessage() {
    const accessToken = window.sessionStorage.getItem("access_token");
    const url = this.state.baseUrl + "/conversation";
    const message = {id_receveur: this.state.id_contact, message: this.state.newMessage};
    console.log(accessToken)
    axios.post(url, message, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).then(() => 
    {
      this.setState(state => ({
        //messages: state.messages.concat(state.newMessage),
        newMessage: ''
      }));
    })
    
  }

  handleNewMessageChange(event) {
    this.setState({ newMessage: event.target.value });
  }

  toggleMinimize() {
    this.setState(state => ({ isMinimized: !state.isMinimized }));
  }

  handleWriteConversation(conversation) {
    const messagesList = []
    for(let index = 0; index < conversation.length; index++)
    {
      let message = conversation[index].date_message + ' - ' + conversation[index].prenom_emetteur + ' : ' + conversation[index].message
      if (conversation[index].id_emetteur == this.state.id_contact){
        message = ">>> " + message;
      }
      else {
        message = "<<< " + message;
      }
      messagesList.push(message) // date - Prenom Nom : message
    }
    this.setState({
      messages: messagesList,
    })
  }

  render() {
    return (
      <div className={`chatbox ${this.state.isMinimized ? 'minimized' : ''}`}>
        <div className="header" onClick={this.toggleMinimize}>
          Chat Box
        </div>
        {!this.state.isMinimized && (
          <div className="content">
            {this.state.messages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
            <input
              value={this.state.newMessage}
              onChange={this.handleNewMessageChange}
              placeholder="Type a message..."
            />
            <button onClick={this.handleSendMessage}>Send</button>
          </div>
        )}
      </div>
    );
  }
}

export default Message;
