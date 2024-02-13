const express = require('express');
const http = require('http');
const websocketSetup = require('./websocket');
const path = require('path');

const app = express();
const server = http.createServer(app);

//WebSocket
websocketSetup(server);

//routes
app.get('/', (req, res) => {
  res.send('Day13');
});

//route for "/websocket" endpoint
app.get('/websocket', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
