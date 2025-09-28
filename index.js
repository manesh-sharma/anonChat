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

// Fixed colorIndex to ensure consistent color assignment
let colorIndex = 0;

// Function to assign color to a user
function assignColorToUser(userId) {
  if (!userColors[userId]) {
    userColors[userId] = availableColors[colorIndex % availableColors.length];
    colorIndex++;
    console.log(`Assigned color ${userColors[userId]} to user ${userId}`);
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
    // We keep the color assigned to maintain consistency if they reconnect
  });

  socket.on('chat-message', (msg) => {
    try {
      // Validate the message
      if (msg === null || msg === undefined) {
        console.error('Received null or undefined message from', socket.id);
        return;
      }
      
      // Make sure we have a color assigned
      const userColor = userColors[socket.id] || assignColorToUser(socket.id);
      console.log('Message received:', msg, 'from', socket.id, 'with color', userColor);
      
      // Send the message, sender's ID, and the sender's color
      io.emit('chat-message', { 
        text: String(msg), // Convert to string to handle non-string inputs
        userId: socket.id,
        color: userColor
      });
    } catch (error) {
      console.error('Error processing message:', error);
      socket.emit('error', 'Failed to process message');
    }
  });  
});

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
  return res.sendFile('public/index.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Something went wrong!');
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

