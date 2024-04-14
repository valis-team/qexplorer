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
    <div className="pb-12 pt-32 px-10 md:px-40 lg:px-60">
      <Typography className="text-24 text-white font-mont">Rich List</Typography>
      <div className="mt-12 flex flex-wrap gap-12 ">
        <Typography
          className={`px-16 py-8 rounded-full ${
            token === 'QU' ? 'bg-gray-60 text-white' : 'bg-gray-70 text-primary-40'
          }`}
          role="button"
          component={Link}
          to="/richlist/QU"
        >
          QU
        </Typography>
        {tokens?.map((item, key) => (
          <Typography
            key={key}
            className={`px-16 py-8 rounded-full ${
              token === item ? 'bg-gray-60 text-white' : 'bg-gray-70 text-primary-40'
            }`}
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
