import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const WebSocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

const useWebSocket = (socketUrl) => {
  const [messages, setMessages] = useState([]);
  const [websocket, setWebsocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(socketUrl);

    const onOpen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    const onMessage = (event) => {
      console.log(event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    const onError = (error) => {
      console.error('WebSocket error: ', error);
      setIsConnected(false);
    };

    const onClose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    ws.addEventListener('open', onOpen);
    ws.addEventListener('message', onMessage);
    ws.addEventListener('error', onError);
    ws.addEventListener('close', onClose);

    setWebsocket(ws);

    return () => {
      ws.removeEventListener('open', onOpen);
      ws.removeEventListener('message', onMessage);
      ws.removeEventListener('error', onError);
      ws.removeEventListener('close', onClose);
      ws.close();
    };
  }, [socketUrl]); // Ensure WebSocket is recreated only if socketUrl changes

  const sendMessage = useCallback(
    (message) => {
      if (websocket && isConnected) {
        websocket.send(message);
      }
    },
    [websocket, isConnected]
  );

  return { messages, sendMessage, isConnected };
};

export const SocketProvider = ({ children, socketUrl }) => {
  const websocket = useWebSocket(socketUrl);
  return <WebSocketContext.Provider value={websocket}>{children}</WebSocketContext.Provider>;
};
