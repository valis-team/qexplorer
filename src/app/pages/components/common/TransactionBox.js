import { Typography, useMediaQuery } from '@mui/material';
import TransactionText from './TransactionText';
import AddressText from './AddressText';

const TransactionBox = (props) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  return (
    <div className="flex gap-10 md:gap-20 flex-wrap items-center">
      <div className="flex gap-4 md:gap-6 items-start">
        <img className="w-24 md:w-32 h-24 md:h-32" src="assets/icons/info_icon.svg" alt="" />
        <div className="flex flex-col gap-4">
          <div className="flex gap-6">
            <Typography className="text-12 px-5 py-2 text-celestial-100 bg-celestial-20 rounded-4">
              Transaction
            </Typography>
            <div className="flex items-center gap-2">
              <img className="w-14 md:w-16 h-14 md:h-16" src="assets/icons/ok_icon.svg" alt="" />
              <Typography className="text-11 px-5 py-2 text-green-600 bg-celestial-20 rounded-4">
                Success
              </Typography>
            </div>
          </div>
          <div className="flex gap-4 md:gap-8 items-center">
            <img
              className="w-20 md:w-24 h-20 md:h-24"
              src="assets/icons/multi-icon_blue.svg"
              alt=""
            />
            <TransactionText
              tx={props?.txid}
              letter={isMobile ? 10 : null}
              className="text-16"
              copy
              link
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <img className="w-28 md:w-32 h-28 md:h-32" src="assets/icons/arrow_down.svg" alt="" />
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <img className="w-20 h-20" src="assets/icons/wallet-icon_blue.svg" alt="" />
            <AddressText
              address={props?.src}
              letter={isMobile ? 10 : null}
              className="text-14"
              copy
              link
            />
          </div>
          <div className="flex gap-6">
            <img className="w-20 h-20" src="assets/icons/wallet-icon_blue.svg" alt="" />
            <AddressText
              address={props?.dest}
              letter={isMobile ? 10 : null}
              className="text-14"
              copy
              link
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionBox;
