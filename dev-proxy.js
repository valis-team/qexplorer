const WebSocket = require('ws');
require('dotenv').config();

// Use the environment variables
const PORT = process.env.REACT_APP_SOCKET_PORT || 7005;
const LIVESOCKET_URL = process.env.REACT_APP_LIVE_SOCKET_URL || 'wss://websocket.qsilver.org';

// Create a new WebSocket server
const ws = new WebSocket.Server({ port: PORT });

ws.on('connection', function connection(clientSocket) {
  console.log('A new client connected!');
  clientSocket.send('Hello from the server!');

  let liveSocket;
  let reconnectAttempts = 0;

  const connectToLiveSocket = () => {
    liveSocket = new WebSocket(LIVESOCKET_URL);

    liveSocket.on('open', () => {
      console.log('Connected to the live socket for client');
      reconnectAttempts = 0;
    });

    liveSocket.on('message', (data) => {
      // console.log(`Received from live socket: ${data}`);
      if (clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.send(`${data}`);
      }
    });

    liveSocket.on('error', (error) => {
      console.log(`LiveSocket WebSocket error: ${error.message}`);
    });

    liveSocket.on('close', () => {
      console.log('Disconnected from the live socket for client');
      // reconnectAttempts += 1;
      // const reconnectDelay = Math.min(5000 * reconnectAttempts, 30000); // Exponential backoff with a max delay
      // console.log(`Attempt reconnection after ${reconnectDelay / 1000} seconds`);
      // setTimeout(connectToLiveSocket, reconnectDelay);
    });
  };

  connectToLiveSocket();

  clientSocket.on('message', (message) => {
    console.log(`Received from a client: ${message}`);
    if (liveSocket.readyState === WebSocket.OPEN) {
      liveSocket.send(`${message}`);
    } else {
      connectToLiveSocket();
      liveSocket.send(`${message}`);
    }
  });

  clientSocket.on('close', () => {
    console.log('Client has disconnected');
    if (liveSocket.readyState !== WebSocket.CLOSED) {
      liveSocket.close();
    }
  });

  clientSocket.on('error', (error) => {
    console.log(`Client WebSocket error: ${error.message}`);
  });
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
