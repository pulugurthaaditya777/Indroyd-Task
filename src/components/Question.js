// src/components/Question.js
import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import io from 'socket.io-client';
import './Question.css';


const socket = io('http://192.168.1.2:4000'); // My local IP address for socket connection

const questions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What is the color of the sky?", answer: "Blue" },
  { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
  { question: "What is the currency of Japan?", answer: "Yen" }
];

const Question = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on('correctAnswer', (name) => {
      setMessage(`Congratulations ${name}!`);
      setTimeout(() => {
        setMessage("");
        setCurrentQuestion((prev) => (prev + 1) % questions.length);
      }, 3000);
    });

    socket.on('incorrectAnswer', () => {
      setMessage("Wrong answer! Try again.");
      setTimeout(() => setMessage(""), 3000);
    });
  }, []);

  return (
    <div className="container">
    <div className="centered-content">
      <h1>{questions[currentQuestion].question}</h1>
      <QRCodeCanvas value={`http://192.168.1.2:3000/play?question=${currentQuestion}`} />
      <p>{message}</p>
    </div>
    </div>
  );
};

export default Question;
