// server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

let questions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What is the color of the sky?", answer: "Blue" },
  { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
  { question: "What is the currency of Japan?", answer: "Yen" }
];

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('submitAnswer', ({ name, answer, questionIndex }) => {
    if (questions[questionIndex].answer.toLowerCase() === answer.toLowerCase()) {
      socket.emit('correctAnswer', name);
      socket.broadcast.emit('correctAnswer', name); // Notify all clients
    } else {
      socket.emit('wrongAnswer');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
