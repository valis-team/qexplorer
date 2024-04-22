import { Typography, Box } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatEllipsis, copyText } from 'src/app/utils/function';

const TransactionText = (props) => {
  const { tx, letter, copy, className, link } = props;
  const [isCopy, setIsCopy] = useState(false);
  const handleCopy = () => {
    copyText(tx);
    setIsCopy(true);
  };
  return (
    <Box className="flex gap-3 items-start">
      <Link to={link ? `/explorer/tx/${tx}` : ''}>
        <Typography className={`text-hawkes-100 font-space ${className}`}>
          {letter ? formatEllipsis(tx, letter) : tx}
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

export default TransactionText;
