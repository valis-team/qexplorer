import { LinearProgress, Typography, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useSocket } from 'src/app/context/SocketContext';
import { useParams } from 'react-router-dom';
import { formatString } from 'src/app/utils/function';
import AddressText from '../components/common/AddressText';

function RichlistContent() {
  const { richlist, loading, sendMessage } = useSocket();
  const { token } = useParams();

  const isSp = useMediaQuery('(max-width:1024px)');

  useEffect(() => {
    if (token === 'QU') {
      sendMessage('richlist');
    } else {
      sendMessage(`richlist.${token}`);
    }
  }, [token, sendMessage]);

  if (loading) {
    return (
      <div className="absolute w-full md:w-4/5">
        <LinearProgress color="primary" />
      </div>
    );
  }

  return (
    <>
      <div className="container px-10 md:px-40 lg:px-60">
        <div className="flex w-full border-1 border-main-50 flex-col p-12">
          <div className="p-10 flex justify-between items-center bg-celestial-10">
            <Typography className="text-moonstone-100 w-28 xs:w-40 sm:w-80 md:w-120 text-12 md:text-16">
              No
            </Typography>
            <Typography className="text-moonstone-100 flex flex-1 text-12 md:text-16">
              Address
            </Typography>
            <Typography className="text-moonstone-100 text-12 md:text-16">Amount</Typography>
          </div>
          <div className="flex flex-col">
            {richlist?.map((item, key) => (
              <div className="flex border-b-1 pt-16 pb-4 px-10" key={key}>
                <Typography className="w-28 xs:w-40 sm:w-80 md:w-120 text-hawkes-100 text-14 xs:text-16">
                  {item[0]}
                </Typography>
                <div className="flex flex-1">
                  <AddressText
                    className="text-14"
                    address={item[1]}
                    letter={isSp ? 5 : null}
                    link
                    copy
                  />
                </div>
                <Typography className="text-hawkes-100 font-space text-14 xs:text-16">
                  {formatString(item[2])}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RichlistContent;
