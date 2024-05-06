import { Typography } from '@mui/material';
import TokenTab from '../components/TokenTab';

const RichlistHeader = () => {
  return (
    <div className="flex mx-auto max-w-[1220px] flex-col md:flex-row justify-start md:justify-between py-4 px-8 md:py-24">
      <div className="flex items-center gap-6">
        <img className="w-24 md:w-36 h-24 md:h-36" src="assets/icons/supply.svg" alt="icon" />
        <Typography className="text-hawkes-100 text-24 md:text-28 font-urb text-bold">
          Rich List
        </Typography>
      </div>
      <TokenTab />
    </div>
  );
};

export default RichlistHeader;
