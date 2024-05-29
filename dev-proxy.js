const WebSocket = require('ws');
require('dotenv').config();

// Use the environment variables
const PORT = process.env.REACT_APP_SOCKET_PORT || 7005;
const LIVESOCKET_URL = process.env.REACT_APP_LIVE_SOCKET_URL || 'wss://websocket.qsilver.org';

// Create a new WebSocket server
const ws = new WebSocket.Server({ port: PORT });

// Handle incoming connections from clients
ws.on('connection', function connection(clientSocket) {
  console.log('A new client connected!');

  // Send a welcome message to the newly connected client
  clientSocket.send('Hello from the server!');

  // Create a new WebSocket connection to the live socket server for this client
  let liveSocket = new WebSocket(LIVESOCKET_URL);
  liveSocket.on('open', () => {
    console.log('Connected to the live socket for client');
  });

  liveSocket.on('error', (error) => {
    console.log(`LiveSocket WebSocket error: ${error.message}`);
    console.log(`Attempt reconnection after a delay`);
    // Attempt reconnection after a delay
    setTimeout(() => {
      liveSocket = new WebSocket(LIVESOCKET_URL);
    }, 5000); // Try to reconnect after 5 seconds
  });

  liveSocket.on('message', (data) => {
    console.log(`Received from live socket: ${data}`);
    // Send the data to the client
    if (clientSocket.readyState === WebSocket.OPEN) {
      clientSocket.send(`${data}`);
    }
  });

  liveSocket.on('close', () => {
    console.log('Disconnected from the live socket for client');
    console.log(`Attempt reconnection after a delay`);
    // Attempt reconnection after a delay
    setTimeout(() => {
      liveSocket = new WebSocket(LIVESOCKET_URL);
    }, 5000); // Try to reconnect after 5 seconds
  });

  // Handle incoming messages from this client
  clientSocket.on('message', function incoming(message) {
    console.log(`Received from a client: ${message}`);
    // Relay the message to the live external WebSocket server
    if (liveSocket.readyState === WebSocket.OPEN) {
      liveSocket.send(`${message}`);
    } else {
      console.log('LiveSocket connection is not open');
    }
  });

  // Handle client disconnection
  clientSocket.on('close', () => {
    console.log('Client has disconnected');
    // Close the live socket connection when the client disconnects
    if (liveSocket.readyState !== WebSocket.CLOSED) {
      liveSocket.close();
    }
  });
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
