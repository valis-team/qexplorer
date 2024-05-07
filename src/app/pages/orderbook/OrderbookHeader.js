import { useEffect } from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSocket } from 'src/app/context/SocketContext';
import AddressText from '../components/common/AddressText';
import TokenTab from '../components/TokenTab';

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
    <div className="flex w-full flex-col lg:flex-row justify-start md:justify-between px-8 py-8 md:px-36 md:p-16">
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
      <TokenTab tokens={tokens} />
    </div>
  );
};

export default OrderbookHeader;
