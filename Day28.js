const http = require('http');
const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);


function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('New WebSocket connection established.');

        ws.on('message', (message) => {
            console.log('Received message:', message);

            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });
    });
}

setupWebSocketServer(server);


server.listen(8000, () => {
    console.log('Server is running on port 8000');
});
