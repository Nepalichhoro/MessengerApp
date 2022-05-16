import React, { useState } from "react";
import {
    useParams
  } from "react-router-dom";

import "./MessengerChannel.css";

import ChatMessage from "../Message/Message";
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import useMessengerController from "../../useMessengerController";
import Users from "../Users/Users";

/**
 * 
 * @param {*} props 
 * @returns null or component with list of users and input form
 */
const MessengerChannel = (props) => {
    const { channelId } = useParams();
    const {
        messages,
        user,
        users,
        sendMessage,
    } = useMessengerController(channelId);

    const [newMessage, setNewMessage] = useState("");

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        sendMessage(newMessage);
        setNewMessage("");
    };

    if(user){
        return (
            <div className="chat-channel-container">
              <div className="chat-channel-top-bar">
                <h1 className="channel-name">Channel: {channelId}</h1>
                {`Hello ${user.name}!`}
              </div>
              <Users users={users}></Users>
              <div className="messages-container">
                <ol className="messages-list">
                  {messages.map((message, i) => (
                    <li key={i}>
                      <ChatMessage message={message}></ChatMessage>
                    </li>
                  ))}
                </ol>
              </div>
              <NewMessageForm
                newMessage={newMessage}
                handleNewMessageChange={handleNewMessageChange}
                handleSendMessage={handleSendMessage}
              />
            </div>
          );
    }
};

export default MessengerChannel;
