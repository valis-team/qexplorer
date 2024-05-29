const WebSocket = require('ws');

const LIVESOCKET_URL = 'wss://websocket.qsilver.org/'; // Use 'wss://' for secure WebSocket connections
const PORT = 7005;

let liveSocket = null;

// Create a new WebSocket server
const wss = new WebSocket.Server({ port: PORT });

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

// Function to connect to live socket
function connectToLiveSocket() {
  liveSocket = new WebSocket(LIVESOCKET_URL);

  liveSocket.on('open', () => {
    console.log('Connected to the live socket');
  });

  liveSocket.on('error', (error) => {
    console.error(`LiveSocket WebSocket error: ${error.message}`);
    // Attempt reconnection after a delay
    setTimeout(connectToLiveSocket, 5000); // Try to reconnect after 5 seconds
  });

  liveSocket.on('message', (data) => {
    console.log(`Received from live socket: ${data}`);
    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${data}`);
      }
    });
  });

  liveSocket.on('close', () => {
    console.log('Disconnected from the live socket');
    // Attempt reconnection after a delay
    setTimeout(connectToLiveSocket, 5000); // Try to reconnect after 5 seconds
  });
}

// Function to set expiration time for liveSocket
function setExpirationTime() {
  // Close the liveSocket connection after 1 hour
  setTimeout(() => {
    if (liveSocket && liveSocket.readyState !== WebSocket.CLOSED) {
      liveSocket.close();
      console.log('LiveSocket connection expired and closed');
    }
  }, 360000); // 1 hour in milliseconds
}

// Handle incoming connections from clients
wss.on('connection', function connection(ws) {
  console.log('A new client connected!');

  // Send a welcome message to the newly connected client
  ws.send('Hello from the server!');

  // Handle incoming messages from this client
  ws.on('message', function incoming(message) {
    console.log(`Received from a client: ${message}`);
    // Relay the message to the live external WebSocket server
    if (liveSocket && liveSocket.readyState === WebSocket.OPEN) {
      liveSocket.send(`${message}`);
    } else {
      console.log('LiveSocket connection is not open');
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client has disconnected');
  });
});

// Start the connection to live socket and set expiration time
connectToLiveSocket();
setExpirationTime();
