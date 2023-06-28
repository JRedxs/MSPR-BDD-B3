import React from 'react';
import '../styles/Message.css';
import axios from 'axios';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMinimized: false,
      messages: [],
      newMessage: ''
    };

    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleNewMessageChange = this.handleNewMessageChange.bind(this);
    this.toggleMinimize = this.toggleMinimize.bind(this);
  }

  handleSendMessage() {
    this.setState(state => ({
      messages: state.messages.concat(state.newMessage),
      newMessage: ''
    }));
  }

  handleNewMessageChange(event) {
    this.setState({ newMessage: event.target.value });
  }

  toggleMinimize() {
    this.setState(state => ({ isMinimized: !state.isMinimized }));
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
