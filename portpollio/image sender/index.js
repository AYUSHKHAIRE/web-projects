const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('image', (dataURL) => {
    // Broadcast the image to all clients
    io.emit('image', dataURL);
  });
});

http.listen(3000, () => {
  console.log('Server is running on port 3000');
});
