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
    <div className="flex mx-auto max-w-[1220px] flex-col md:flex-row justify-start md:justify-between py-4 px-8 md:py-24">
      <div className="flex items-center gap-6">
        <img className="w-24 md:w-36 h-24 md:h-36" src="assets/icons/supply.svg" alt="icon" />
        <Typography className="text-hawkes-100 text-24 md:text-28 font-urb text-bold">
          Rich List
        </Typography>
      </div>
      <div className="mt-4 flex flex-wrap">
        {['QU', ...(tokens || [])].map((item, key) => (
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
            to={`/richlist/${item}`}
          >
            {item}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default RichlistHeader;
