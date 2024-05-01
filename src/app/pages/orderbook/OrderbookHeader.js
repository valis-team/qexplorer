import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useSocket } from 'src/app/context/SocketContext';

const OrderbookHeader = () => {
  const { tokens, sendMessage } = useSocket();
  const { token } = useParams();

  useEffect(() => {
    sendMessage('tokenlist');
  }, [sendMessage]);

  return (
    <div className="flex w-full flex-col md:flex-row justify-start md:justify-between p-4 md:p-12">
      <div className="flex items-center gap-6">
        <img className="w-24 md:w-28 h-24 md:h-28" src="assets/icons/book_mark.svg" alt="icon" />
        <Typography className="text-hawkes-100 text-24 font-urb text-bold">Order Book</Typography>
      </div>
      <div className="mt-4 flex gap-12 flex-wrap">
        {tokens?.slice(0, 6).map((item, key) => (
          <Typography
            key={key}
            className={`px-16 py-8 rounded-t-8 ${
              token === item ? 'border-b-2 text-bold text-white' : 'text-main-50'
            }`}
            role="button"
            component={Link}
            to={`/orderbook/${item}`}
            style={{ borderColor: '#d2e0fc80' }}
          >
            {item}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default OrderbookHeader;
