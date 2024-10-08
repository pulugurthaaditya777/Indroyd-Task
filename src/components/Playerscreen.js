// src/components/PlayerScreen.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';

const socket = io('http://192.168.1.2:4000');

const PlayerScreen = () => {
  const [searchParams] = useSearchParams();
  const questionIndex = searchParams.get('question');
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const questions = [
      "What is the capital of France?",
      "What is 2 + 2?",
      "What is the color of the sky?",
      "What is the largest planet in our solar system?",
      "What is the currency of Japan?"
    ];
    
    if (questionIndex !== null) {
      setQuestion(questions[parseInt(questionIndex, 10)]);
    }
  }, [questionIndex]);

  const handleSubmit = () => {
    socket.emit('submitAnswer', { name, answer, questionIndex });
    setAnswer(""); // Clear the answer input after submitting
  };

  useEffect(() => {
    socket.on('wrongAnswer', () => {
      setMessage("Incorrect answer, please try again.");
    });
    
    socket.on('correctAnswer', (name) => {
      setMessage(`Congratulations ${name}!`);
    });
  }, []);

  return (
    <div>
      <h1>{question}</h1>
      <input 
        type="text" 
        placeholder="Your Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Your Answer" 
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

export default PlayerScreen;
