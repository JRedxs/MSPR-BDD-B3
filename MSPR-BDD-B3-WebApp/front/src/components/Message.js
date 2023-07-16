import React from 'react';
import { Flex, Button, Box, Input, VStack, IconButton, Text, Tag } from "@chakra-ui/react";
import { CloseIcon, ArrowForwardIcon } from "@chakra-ui/icons";
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
    this.handleClose = this.handleClose.bind(this);
    
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
    }, 1000) //1s
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

  handleClose(event) {
    event.stopPropagation();
    clearInterval(this.update_clock);
    this.props.onClose();
  }

  handleWriteConversation(conversation) {
    const messagesList = []
    for(let index = 0; index < conversation.length; index++)
    {
      let message = conversation[index].date_message + ' - ' + conversation[index].prenom_emetteur + ' : ' + conversation[index].message
      if (conversation[index].id_emetteur === this.state.id_contact){
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
      <Box 
        position="fixed"
        bottom="0"
        right="0"
        w="300px"
        h={this.state.isMinimized ? "20px" : "500px"}
        border="1px"
        borderColor="gray.300"
        bgColor="white"
        overflow="auto"
        zIndex="9999"
        pointerEvents="auto"
        opacity="1"
      >
        <Flex 
          h="40px"
          bgColor="#3f8623f7"
          p="5px"
          cursor="pointer"
          justifyContent="space-between" 
          onClick={this.toggleMinimize}
        >
          <Text fontSize="lg" fontWeight="bold" color="white">Conversation</Text>
          <IconButton icon={<CloseIcon />} onClick={this.handleClose} size="sm" />
        </Flex>
        {!this.state.isMinimized && (
          <Box p="10px">
            <VStack spacing={2} align="stretch">
              {this.state.messages.map((message, index) => {
                const isEmitter = message.startsWith('>>>');
                const colorScheme = isEmitter ? "teal" : "blue";

                return (
                  <Tag key={index} colorScheme={colorScheme} rounded="full" px={2} py={1}>
                    <Text fontSize="sm">{message}</Text>
                  </Tag>
                );
              })}
            </VStack>
            <Flex mt={4}>
              <Input
                value={this.state.newMessage}
                onChange={this.handleNewMessageChange}
                placeholder="Type a message..."
                w="100%"
              />
              <IconButton icon={<ArrowForwardIcon />} onClick={this.handleSendMessage} ml={2} />
            </Flex>
          </Box>
        )}
      </Box>
    );
  }
}

export default Message;