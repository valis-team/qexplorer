const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const WebSocket = require('ws');
const socketIo = require('socket.io');

const FRONTEND_URL = 'http://localhost:3000';
const LIVESOCKET_URL= 'https://qsilver.org:5555';
const PORT = 7005

io = socketIo(http, {
    cors: {
        origin: '*',
    }
});

liveSocket = new WebSocket(LIVESOCKET_URL);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('test', (msg) => {
        console.log(msg)
        socket.emit('test', msg)
    });

    socket.on('livesocketRequest', (data) => {
        liveSocket.send(data);
    })

    socket.on('disconnect', () => {

    });
});

liveSocket.on('open', () => {
    console.log("Connected to the live socket");
});

liveSocket.on('error', (error) => {
    console.error(`WebSocket error: ${error}`);
});

liveSocket.onmessage = (event) => {
    console.log(event.data)
    const data = event.data;
    io.emit('livesocketResponse', data);
};

liveSocket.on('close', () => {
    console.log("Disconnected from the server");
});

// Middleware to enable CORS with dynamic origin support
app.use(cors({ origin: FRONTEND_URL }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the HTTP server listening on the specified port
http.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
