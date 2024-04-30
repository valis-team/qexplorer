import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useSocket } from 'src/app/context/SocketContext';

const RichlistHeader = () => {
  const { tokens, sendMessage } = useSocket();
  const { token } = useParams();

  useEffect(() => {
    sendMessage('tokenlist');
  }, [sendMessage]);

  return (
    <div className="flex w-full justify-between pb-12 pt-32 px-10 md:px-40 lg:px-60">
      <Typography className="text-24 text-bold text-white font-urb">Rich List</Typography>
      <div className="mt-4 flex gap-12 flex-wrap">
        <Typography
          className={`px-16 py-8 rounded-t-8 ${
            token === 'QU' ? 'border-b-2 text-bold text-white' : 'text-main-50'
          }`}
          role="button"
          component={Link}
          to="/richlist/QU"
          style={{ borderColor: '#d2e0fc80' }}
        >
          QU
        </Typography>
        {tokens?.slice(0, 6).map((item, key) => (
          <Typography
            key={key}
            className={`px-16 py-8 rounded-t-8 ${
              token === item ? 'border-b-2 text-bold text-white' : 'text-main-50'
            }`}
            role="button"
            component={Link}
            to={`/richlist/${item}`}
            style={{ borderColor: '#d2e0fc80' }}
          >
            {item}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default RichlistHeader;
