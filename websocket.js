const WebSocket = require('ws');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', function connection(ws) {
    console.log('User connected');

    ws.on('message', function incoming(message) {
      console.log('Received: %s', message);
      ws.send(`Echo: ${message}`);
    });

    ws.on('close', function close() {
      console.log('User disconnected');
    });
  });
}

module.exports = setupWebSocket;
