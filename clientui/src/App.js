import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./components/Home/Homepage";
import MessengerChannel from "./components/MessengerChannel/MessengerChannel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/:channelId" element={ <MessengerChannel />} />
      </Routes>
    </Router>
  );
}

export default App;
