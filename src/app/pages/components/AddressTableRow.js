import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';

function AddressTableRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell
          component="th"
          scope="row"
          className="border-b-main-80 text-celestial-100 cursor-pointer"
        >
          <Tooltip title={row[0]}>
            <Typography className="text-blue-A100 text-14 font-mono">{row[0]}</Typography>
          </Tooltip>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          className="border-b-main-80 text-celestial-100 cursor-pointer"
        >
          <Tooltip title={row[1]}>
            <Typography className="text-blue-A100 text-14 font-mono">{row[1]}</Typography>
          </Tooltip>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          className="border-b-main-80 text-celestial-100 cursor-pointer"
        >
          <Tooltip title={row[2]}>
            <Typography className="text-blue-A100 text-14 font-mono">{row[2]}</Typography>
          </Tooltip>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          className="border-b-main-80 text-celestial-100 cursor-pointer"
        >
          <Tooltip title={row[3]}>
            <Typography className="text-blue-A100 text-14 font-mono">{row[3]}</Typography>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
}

export default AddressTableRow;
