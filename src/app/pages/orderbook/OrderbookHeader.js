import { useEffect } from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useSocket } from 'src/app/context/SocketContext';
import AddressText from '../components/common/AddressText';

const OrderbookHeader = () => {
  const { tokens, tokenissuer, sendMessage } = useSocket();
  const { token } = useParams();
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    sendMessage('tokenlist');
  }, [sendMessage]);

  useEffect(() => {
    if (token) {
      sendMessage(`tokenissuer ${token}`);
    }
  }, [token]);

  return (
    <div className="flex w-full flex-col md:flex-row justify-start md:justify-between px-8 py-8 md:px-36 md:p-16">
      <div className="flex items-center gap-6">
        <img className="w-24 md:w-28 h-24 md:h-28" src="assets/icons/book_mark.svg" alt="icon" />
        <Typography className="text-hawkes-100 text-24 font-urb text-bold">Order Book</Typography>
        {tokenissuer?.issuer && tokenissuer.address ? (
          <AddressText
            className="text-18 mt-4 ml-10 text-hawkes-100"
            address={tokenissuer.address}
            letter={isMobile ? 6 : 8}
            link
            copy
          />
        ) : (
          <Typography className="text-18 text-hawkes-100 text-bold font-urb mt-4 ml-10">{`SC: ${
            tokenissuer.contractid || 0
          }`}</Typography>
        )}
      </div>
      <div className="mt-4 flex flex-wrap">
        {tokens.map((item, key) => (
          <Typography
            key={key}
            className={`px-16 md:px-32 py-8 rounded-t-8 ${
              token === item
                ? 'border-b-2 border-hawkes-100 text-bold text-white'
                : 'text-main-50  border-b-1'
            }`}
            style={{ borderColor: token === item ? '#D2E0FC' : '#d2e0fc4d' }}
            role="button"
            component={Link}
            to={`/orderbook/${item}`}
          >
            {item}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default OrderbookHeader;
