import { Typography, Box } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { copyText, formatEllipsis } from 'src/app/utils/function';

const AddressText = (props) => {
  const { address, letter, copy, className, link } = props;
  const [isCopy, setIsCopy] = useState(false);
  const handleCopy = () => {
    copyText(address);
    setIsCopy(true);
  };
  return (
    <Box className="flex gap-3 items-start">
      <Link to={link ? `/explorer/address/${address}` : ''}>
        <Typography className={`text-hawkes-100 font-space ${className}`}>
          {letter ? formatEllipsis(address, letter) : address}
        </Typography>
      </Link>
      {copy && (
        <button type="button" onClick={handleCopy}>
          {isCopy ? (
            <img className="w-16 h-16 mb-4" src="assets/icons/ok_icon_light.svg" alt="" />
          ) : (
            <img className="w-20 h-20 mb-4" src="assets/icons/copy_icon.svg" alt="" />
          )}
        </button>
      )}
    </Box>
  );
};

export default AddressText;
