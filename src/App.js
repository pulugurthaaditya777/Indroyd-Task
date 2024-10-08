// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Question from './components/Question';
import PlayerScreen from './components/Playerscreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Question />} />
        <Route path="/play" element={<PlayerScreen />} />
      </Routes>
    </Router>
  );
};

export default App;

