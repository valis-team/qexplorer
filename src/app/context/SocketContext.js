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
  const [emptyticks, setEmptyticks] = useState({});
  const [recenttx, setRecenttx] = useState({});
  const [tokens, setTokens] = useState([]);
  const [richlist, setRichList] = useState([]);
  const [address, setAddress] = useState({});
  const [tick, setTick] = useState({});
  const [tx, setTx] = useState({});
  const [currentTick, setCurrentTick] = useState({});
  const [websocket, setWebsocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [history, setHistory] = useState({});
  const [orderbook, setOrderbook] = useState({});
  const [loading, setLoading] = useState(false); // Added loading state
  const [fetchError, setFetchError] = useState({});

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
        } else if (data.command === 'CurrentTickInfo') {
          setCurrentTick(data);
        } else if (data.tokens) {
          setTokens(data.tokens);
        } else if (data.marketcap) {
          setMarketcap(data);
        } else if (data.emptyticks) {
          setEmptyticks(data);
        } else if (data.recenttx) {
          setRecenttx(data);
        } else if (data.tick && data.spectrum) {
          setTick(data);
        } else if (data.address && data.command === 'EntityInfo') {
          setAddress(data);
        } else if (data.address && data.changes) {
          setHistory(data);
        } else if (data.command === 'txidrequest') {
          setTx(data);
        } else if (data.bids && data.asks) {
          setOrderbook(data);
        } else if (data.error) {
          setFetchError(data);
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

  return {
    marketcap,
    emptyticks,
    recenttx,
    tokens,
    richlist,
    sendMessage,
    isConnected,
    loading,
    address,
    tick,
    tx,
    currentTick,
    orderbook,
    history,
    fetchError,
  };
};

export const SocketProvider = ({ children, socketUrl }) => {
  const { isConnected, ...websocket } = useWebSocket(socketUrl);

  if (!isConnected) {
    return <FuseLoading />; // Show loading indicator while connecting
  }

  return <WebSocketContext.Provider value={websocket}>{children}</WebSocketContext.Provider>;
};
