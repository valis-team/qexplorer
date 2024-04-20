const WebSocket = require('ws');

const LIVESOCKET_URL = 'wss://qsilver.org:5555'; // Use 'wss://' for secure WebSocket connections
const PORT = 7005;

// Create a new WebSocket server
const wss = new WebSocket.Server({ port: PORT });
const liveSocket = new WebSocket(LIVESOCKET_URL);

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

// Handle incoming connections from clients
wss.on('connection', function connection(ws) {
  console.log('A new client connected!');

  // Send a welcome message to the newly connected client
  ws.send('Hello from the server!');

  // Handle incoming messages from this client
  ws.on('message', function incoming(message) {
    console.log(`Received from a client: ${message}`);
    // Relay the message to the live external WebSocket server
    if (liveSocket.readyState === WebSocket.OPEN) {
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

// Handle connections to the external live WebSocket server
liveSocket.on('open', () => {
  console.log('Connected to the live socket');
});

// Handle errors in the external live WebSocket connection
liveSocket.on('error', (error) => {
  console.error(`LiveSocket WebSocket error: ${error.message}`);
});

// Handle messages from the external live WebSocket server
liveSocket.on('message', (data) => {
  console.log(`Received from live socket: ${data}`);
  // Broadcast to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`${data}`);
    }
  });
});

// Handle closing of the external live WebSocket connection
liveSocket.on('close', () => {
  console.log('Disconnected from the live socket');
});
