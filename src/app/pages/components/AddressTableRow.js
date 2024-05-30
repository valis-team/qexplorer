import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import AddressText from './common/AddressText';
import TransactionText from './common/TransactionText';
import TickText from './common/TickText';

function AddressTableRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row" className="border-b-main-80">
          <TickText className="text-white" tick={row[0]} copy link />
        </TableCell>
        <TableCell component="th" scope="row" className="border-b-main-80">
          <TransactionText tx={row[1]} copy letter={20} link />
        </TableCell>
        <TableCell component="th" scope="row" className="border-b-main-80">
          <AddressText address={row[2]} copy letter={20} link />
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          className="border-b-main-80 text-white cursor-pointer"
        >
          <TickText className="text-white" tick={row[3]} copy />
        </TableCell>
      </TableRow>
    </>
  );
}

export default AddressTableRow;
