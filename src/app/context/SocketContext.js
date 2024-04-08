// context/SocketContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
};

export const SocketProvider = ({ children, socketUrl }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(socketUrl);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [socketUrl]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
