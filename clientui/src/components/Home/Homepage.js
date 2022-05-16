import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Homepage.css";

/**
 * 
 * @returns Home component
 */
const Homepage = () => {
  const [channelName, setChannelName] = useState("");

  const handleChannelNameChange = (event) => {
    setChannelName(event.target.value);
  };

  return (
    <div className="home-container">
      Hello!
      <input
        type="text"
        placeholder="Channel"
        value={channelName}
        onChange={handleChannelNameChange}
        className="text-input-field"
      />
      <Link to={`/${channelName}`} className="enter-channel-button">
        Join a channel
      </Link>
    </div>
  );
};

export default Homepage;