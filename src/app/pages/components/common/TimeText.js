import { Typography, Box, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { copyText } from 'src/app/utils/function';

const TimeText = (props) => {
  const { utcTime, readableTime, copy, className } = props;
  const [isCopy, setIsCopy] = useState(false);
  useEffect(() => {
    if (isCopy) {
      setTimeout(() => setIsCopy(false), 1000);
    }
  }, [isCopy]);
  const handleCopy = () => {
    copyText(utcTime);
    setIsCopy(true);
  };
  return (
    <Box className="flex gap-5 items-center">
      <Tooltip title={readableTime} arrow>
        <Typography className={`text-hawkes-100 font-space ${className}`}>{utcTime}</Typography>
      </Tooltip>
      {copy && (
        <button type="button" onClick={handleCopy}>
          {isCopy ? (
            <img className="w-14 mb-4" src="assets/icons/ok_icon_light.svg" alt="" />
          ) : (
            <img className="w-14 mb-4" src="assets/icons/copy_icon.webp" alt="" />
          )}
        </button>
      )}
    </Box>
  );
};

export default TimeText;
