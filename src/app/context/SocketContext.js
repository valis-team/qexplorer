import FuseLoading from '@fuse/core/FuseLoading';
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
  const [marketcap, setMarketcap] = useState({});
  const [tokens, setTokens] = useState([]);
  const [richlist, setRichList] = useState([]);
  const [websocket, setWebsocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  useEffect(() => {
    const ws = new WebSocket(socketUrl);

    const onOpen = () => {
      setIsConnected(true);
    };

    const onMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.richlist && data.name) {
          setRichList(data.richlist);
        } else if (data.tokens) {
          setTokens(data.tokens);
        } else if (data.marketcap) {
          setMarketcap(data);
        }
        setLoading(false);
      } catch (error) {
        console.log(event.data);
        setLoading(false);
      }
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
  }, [socketUrl]);

  const sendMessage = useCallback(
    (message) => {
      if (websocket && isConnected) {
        websocket.send(message);
        setLoading(true);
      }
    },
    [websocket, isConnected]
  );

  return { tokens, richlist, marketcap, sendMessage, isConnected, loading };
};

export const SocketProvider = ({ children, socketUrl }) => {
  const { isConnected, ...websocket } = useWebSocket(socketUrl);

  if (!isConnected) {
    return <FuseLoading />; // Show loading indicator while connecting
  }

  return <WebSocketContext.Provider value={websocket}>{children}</WebSocketContext.Provider>;
};
