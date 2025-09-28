const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Store user colors on the server
const userColors = {};
const availableColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-cyan-500'
];

// Function to assign color to a user
function assignColorToUser(userId) {
  if (!userColors[userId]) {
    const colorIndex = Object.keys(userColors).length % availableColors.length;
    userColors[userId] = availableColors[colorIndex];
  }
  return userColors[userId];
}

//socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);
  
  // Assign color to the new user
  const userColor = assignColorToUser(socket.id);
  
  // Send the current user colors to the newly connected client
  socket.emit('user-colors', userColors);
  
  // Announce new user to all clients with their assigned color
  io.emit('user-joined', { userId: socket.id, color: userColor });

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
    // Optionally, we could remove the user's color here if desired
    // delete userColors[socket.id];
    // io.emit('user-left', socket.id);
  });

  socket.on('chat-message', (msg) => {
    const userColor = userColors[socket.id];
    console.log('Message received: ' + msg + ' from ' + socket.id + ' with color ' + userColor);
    
    // Send the message, sender's ID, and the sender's color
    io.emit('chat-message', { 
      text: msg, 
      userId: socket.id,
      color: userColor
    }); // Broadcast the message to all clients
  });  
});

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
  return res.sendFile('public/index.html');
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

//nothing here