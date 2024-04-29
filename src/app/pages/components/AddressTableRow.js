import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { IconButton, Tooltip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TickText from './common/TickText';
import TransactionText from './common/TransactionText';
import AddressText from './common/AddressText';

function AddressTableRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell className="border-b-main-80">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className="border-b-main-80 text-celestial-100">
          <Tooltip title={row.status}>
            <Typography className="text-blue-A100 text-14">{row.balance}</Typography>
          </Tooltip>
        </TableCell>
        <TableCell className="border-b-main-80 text-celestial-100">
          {+row.in[2] === 0 ? null : (
            <div className="flex items-end gap-2">
              <TickText tick={row.in[1]} className="text-14 text-baby-100" link />
              <Typography className="text-hawkes-100 text-12">{`(${row.in[0]}/${row.in[2]})`}</Typography>
            </div>
          )}
        </TableCell>
        <TableCell className="border-b-main-80 text-hawkes-100">{row.newin[1]}</TableCell>
        <TableCell className="border-b-main-80">
          {+row.out[2] === 0 ? null : (
            <div className="flex items-end gap-2">
              <TickText tick={row.out[1]} className="text-14 text-baby-100" link />
              <Typography className="text-hawkes-100 text-12">{`(${row.out[0]}/${row.out[2]})`}</Typography>
            </div>
          )}
        </TableCell>
        <TableCell className="border-b-main-80 text-hawkes-100">{row.newout[1]}</TableCell>
        <TableCell className="border-b-main-80 text-hawkes-100">{row.rank}</TableCell>
        <TableCell className="border-b-main-80">
          <TickText tick={row.tick} className="text-14 text-baby-100" link />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7} className="border-0">
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className="border-b-main-80">TX</TableCell>
                    <TableCell className="border-b-main-80">Tick</TableCell>
                    <TableCell className="border-b-main-80">Address</TableCell>
                    <TableCell className="border-b-main-80" align="right">
                      Balance (QUBIC)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.txids.map((item) => (
                    <TableRow key={item[1]}>
                      <TableCell className="border-0" component="th" scope="row">
                        <TransactionText
                          tx={item[1]}
                          className="text-14 text-baby-100"
                          letter={10}
                          link
                          copy
                        />
                      </TableCell>
                      <TableCell className="border-0">
                        <TickText tick={item[0]} className="text-14 text-baby-100" link copy />
                      </TableCell>
                      <TableCell className="border-0" align="right">
                        <AddressText
                          address={item[2]}
                          className="text-14 text-baby-100"
                          letter={10}
                          link
                          copy
                        />
                      </TableCell>
                      <TableCell className="border-0" align="right">
                        <Typography className="text-hawkes-100 text-14">{item[4] || 0}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default AddressTableRow;
