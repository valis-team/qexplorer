import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { useSocket } from 'src/app/context/SocketContext';

function TickPage() {
  const { tick } = useParams();
  const { address, loading, sendMessage } = useSocket();
  useEffect(() => {
    sendMessage('address');
  }, [sendMessage]);
  if (loading) {
    return (
      <div className="w-full md:w-4/5 absolute">
        <LinearProgress color="primary" />
      </div>
    );
  }
  return (
    <div>
      <h1>{tick}</h1>
    </div>
  );
}

export default TickPage;
