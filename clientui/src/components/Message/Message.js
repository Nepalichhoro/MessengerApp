import React from "react";
import "./Message.css";

/**
 * 
 * @param {*} message 
 * @returns a component based on context of the message object recieved
 */
const Message = ({ message }) => {
  return (
    <div
      className={`message-item ${
        message.ownedByCurrentUser ? "my-message" : "received-message"
      }`}
    >
      <div className="message-body-container">
        {!message.ownedByCurrentUser && (
          <div className="message-user-name">{message.user.name}</div>
        )}
        <div className="message-body">{message.body}</div>
      </div>
    </div>
  );
};

export default Message;
