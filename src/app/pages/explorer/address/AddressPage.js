import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { useSocket } from 'src/app/context/SocketContext';
import LinearProgress from '../../components/common/LinearProgress';
import CardItem from '../../components/CardItem/CardItem';
import AddressText from '../../components/common/AddressText';
import TickText from '../../components/common/TickText';

function AddressPage() {
  const { address: addressParam } = useParams();
  const { address, loading, sendMessage } = useSocket();
  const [addressData, setAddressData] = useState();
  console.log('addresspage -->', address);
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (addressParam) {
      sendMessage(addressParam);
    }
  }, [addressParam]);

  useEffect(() => {
    if (addressParam === address?.address) {
      setAddressData(address);
    }
  }, [address]);

  if (loading) {
    return <LinearProgress />;
  }
  return (
    <Box className="container p-8 md:p-40 flex flex-col gap-20">
      <CardItem className="flex w-full flex-col p-4 md:p-12 gap-5 md:gap-16  justify-start">
        <div>
          <Typography className="text-hawkes-100 text-24 font-urb text-bold text-start">
            Address Detail
          </Typography>
          <div className="flex items-center gap-6 justify-start mt-4">
            <img
              className="w-24 md:w-28 h-24 md:h-28"
              src="assets/icons/wallet-icon.svg"
              alt="icon"
            />
            <AddressText
              className="text-18"
              address={addressData?.address || addressParam || ''}
              letter={isMobile ? 10 : null}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <CardItem className="flex flex-col w-full md:w-1/2 py-8 sm:py-12 px-4 sm:px-16 gap-5 md:gap-10 items-center bg-celestial-10">
            <div className="flex justify-between items-center w-full gap-36 py-3 border-b-1">
              <div className="flex w-60 items-center gap-4">
                <img className="w-20 h-20" src="assets/icons/information-icon.svg" alt="icon" />
                <Typography className="text-hawkes-100 text-16 font-urb">Balance</Typography>
              </div>
              <Typography className="text-white text-16 bold font-urb">
                {addressData?.balance || 0}
              </Typography>
            </div>
            <div className="flex justify-between items-center w-full gap-36 py-3 border-b-1">
              <div className="flex w-60 items-center gap-4">
                <img className="w-20 h-20" src="assets/icons/information-icon.svg" alt="icon" />
                <Typography className="text-hawkes-100 text-16 font-urb">Rank</Typography>
              </div>
              <Typography className="text-white text-16 bold font-urb">
                {addressData?.rank}
              </Typography>
            </div>
            <div className="flex justify-between items-center w-full gap-36 py-3 border-b-1">
              <div className="flex w-60 items-center gap-4">
                <img className="w-20 h-20" src="assets/icons/information-icon.svg" alt="icon" />
                <Typography className="text-hawkes-100 text-16 font-urb">Tick</Typography>
              </div>
              <TickText
                tick={addressData?.tick}
                className="text-16 bold text-baby-100"
                link
                copy={!isEmpty(addressData?.tick)}
              />
            </div>
            <div className="flex justify-between items-center w-full gap-36 py-3 border-b-1">
              <div className="flex items-center gap-4">
                <img className="w-20 h-20" src="assets/icons/information-icon.svg" alt="icon" />
                <Typography className="text-hawkes-100 text-16 font-urb">Lastest In</Typography>
              </div>
              <div className="flex flex-col gap-4 justify-end">
                <TickText
                  tick={addressData?.latestin}
                  className="text-16 text-baby-100"
                  link
                  copy={!isEmpty(addressData?.latestin)}
                />
                <Typography className="text-white text-16 font-urb text-right">
                  {addressData?.numin}
                </Typography>
              </div>
            </div>
            <div className="flex justify-between items-center w-full gap-36 py-3 border-b-1">
              <div className="flex items-center gap-4">
                <img className="w-20 h-20" src="assets/icons/information-icon.svg" alt="icon" />
                <Typography className="text-hawkes-100 text-16 font-urb">Lastest Out</Typography>
              </div>
              <div className="flex flex-col gap-4 justify-end">
                <TickText
                  tick={addressData?.latestout}
                  className="text-16 text-baby-100"
                  link
                  copy={!isEmpty(addressData?.latestout)}
                />
                <Typography className="text-white text-16 font-urb text-right">
                  {addressData?.numout}
                </Typography>
              </div>
            </div>
          </CardItem>
        </div>
      </CardItem>
    </Box>
  );
}

export default AddressPage;
