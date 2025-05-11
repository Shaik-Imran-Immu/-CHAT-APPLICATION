// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); // Socket.io for real-time communication
const cors = require('cors'); // Middleware for enabling CORS

// Initialize Express application
const app = express();
// Create HTTP server using Express app
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Enable CORS middleware for all routes
app.use(cors());

// Socket.io connection event handler
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id); // A new client has connected

  socket.on('chat message', (msg) => {
    console.log(`Message: ${msg}`);
    // Broadcast the message to ALL connected clients
    io.emit('chat message', msg);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
