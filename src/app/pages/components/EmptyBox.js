import { Box, Typography } from '@mui/material';

export default function EmptyBox() {
  return (
    <Box className="flex py-20 md:py-40 w-full justify-center items-center flex-col gap-6">
      <img className="w-84 h-84 opacity-80" src="assets/icons/empty_icon.webp" alt="icon" />
      <Typography className="text-20 text-hawkes-50 text-bold font-urb">DATA EMPTY</Typography>
    </Box>
  );
}
