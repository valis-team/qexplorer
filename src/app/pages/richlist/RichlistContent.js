import { LinearProgress, Typography, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useSocket } from 'src/app/context/SocketContext';
import { useParams } from 'react-router-dom';
import { formatEllipsis, formatString } from 'src/app/utils/function';
import AddressLink from 'src/app/components/AddressLink/AddressLink';

function RichlistContent() {
  const { richlist, loading } = useSocket();
  const socket = useSocket();
  const { token } = useParams();

  const isSp = useMediaQuery('(max-width:1024px)');

  useEffect(() => {
    if (token === 'QU') {
      socket.sendMessage('richlist');
    } else {
      socket.sendMessage(`richlist.${token}`);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="absolute w-full">
        <LinearProgress />
      </div>
    );
  }
  console.log(loading);

  return (
    <>
      <div className="container px-10 md:px-40 lg:px-60">
        <div className="py-20 flex justify-between items-center overflow-x-auto">
          <Typography className="text-primary-70 w-28 xs:w-40 sm:w-80 md:w-120 text-16 md:text-20">
            No.
          </Typography>
          <Typography className="text-primary-70 flex flex-1 text-16 md:text-20">
            Address
          </Typography>
          <Typography className="text-primary-70 text-16 md:text-20">Amount</Typography>
        </div>
        <div className="flex flex-col gap-16">
          {richlist?.map((item, key) => (
            <div className="flex border-b-2 pb-8 border-gray-60" key={key}>
              <Typography className="w-28 xs:w-40 sm:w-80 md:w-120 text-white text-14 xs:text-16">
                {item[0]}
              </Typography>
              <AddressLink
                className="flex flex-1 text-primary-40"
                value={isSp ? formatEllipsis(item[1]) : item[1]}
              />
              <Typography className="text-primary-20 font-space text-14 xs:text-16">
                {formatString(item[2])}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RichlistContent;
