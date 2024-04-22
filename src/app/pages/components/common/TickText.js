import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { formatString, copyText } from 'src/app/utils/function';
import { useState } from 'react';

const TickText = (props) => {
  const { tick, copy, className, format, link } = props;
  const [isCopy, setIsCopy] = useState(false);
  const handleCopy = () => {
    copyText(tick);
    setIsCopy(true);
  };

  return (
    <Box className="flex gap-3 items-start">
      <Link to={link ? `/explorer/tick/${tick}` : ''} className="no-underline text-transparent">
        <Typography className={`font-urb ${className}`}>
          {' '}
          {format ? formatString(tick) : tick}
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

export default TickText;
