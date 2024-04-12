import { Typography } from '@mui/material';
import clsx from 'clsx';

function AddressLink(props) {
  const { value, className } = props;
  return <Typography className={clsx('text-16 font-space', className)}>{value}</Typography>;
}

export default AddressLink;
