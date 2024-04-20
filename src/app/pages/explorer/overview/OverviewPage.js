import { useEffect } from 'react';
import { Typography, LinearProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSocket } from 'src/app/context/SocketContext';
import { formatEllipsis, formatString } from 'src/app/utils/function';
import CardItem from '../../components/CardItem/CardItem';

function OverviewPage() {
  const { marketcap, emptyticks, recenttx, loading, sendMessage } = useSocket();

  useEffect(() => {
    sendMessage('recenttx');
    sendMessage('marketcap');
    sendMessage('emptyticks 1 100000');
  }, [sendMessage]);

  if (loading) {
    return (
      <div className="w-full md:w-4/5 absolute">
        <LinearProgress color="primary" />
      </div>
    );
  }
  const rows = () => {
    return (recenttx.recenttx || []).slice(0, 5).map((ttx) => ({
      tx: ttx.txid,
      tick: ttx.tick,
      source: ttx.src,
      destination: ttx.dest,
      type: ttx.type,
      amount: ttx.amount,
    }));
  };
  return (
    <>
      <div className="container px-12 py-24 md:px-24 flex flex-col gap-10">
        <CardItem className="bg-main-80 flex flex-col gap-10 p-32">
          <Typography className="text-32 text-hawkes-100 text-bold font-urb">Overview</Typography>
          <div className="flex gap-10 flex-wrap">
            <CardItem className="flex py-8 sm:py-12 px-12 sm:px-16 gap-10 items-center w-[255px]">
              <img className="w-40 h-40" src="assets/icons/mainbrand.svg" alt="icon" />
              <div className="flex flex-col items-center">
                <Typography className="text-14 text-hawkes-30 font-urb w-full flex justify-start">
                  Price
                </Typography>
                <Typography className="font-space text-16 md:text-20 text-hawkes-100">
                  {marketcap?.price}
                </Typography>
              </div>
            </CardItem>
            <CardItem className="flex py-8 sm:py-12 px-12 sm:px-16 gap-10 items-center w-[255px]">
              <img className="w-40 h-40" src="assets/icons/market_icon.svg" alt="icon" />
              <div className="flex flex-col items-center">
                <Typography className="text-14 text-hawkes-30 font-urb w-full flex justify-start">
                  Market Cap
                </Typography>
                <Typography className="font-space text-16 md:text-20 text-hawkes-100">
                  {formatString(marketcap?.marketcap)}
                </Typography>
              </div>
            </CardItem>
            <CardItem className="flex py-8 sm:py-12 px-12 sm:px-16 gap-10 items-center min-w-[255px]">
              <img className="w-40 h-40" src="assets/icons/supply.svg" alt="icon" />
              <div className="flex flex-col items-center">
                <Typography className="text-14 text-hawkes-30 font-urb w-full flex justify-start">
                  Supply
                </Typography>
                <Typography className="font-space text-16 md:text-20 text-hawkes-100">
                  {formatString(marketcap?.supply)}
                </Typography>
              </div>
            </CardItem>
          </div>
        </CardItem>
        <CardItem className="bg-main-80 flex flex-col gap-10 p-32">
          <Typography className="text-24 md:text-32 font-urb text-hawkes-100">
            Recent Transactions
          </Typography>
          <div>
            <TableContainer component={Paper} className="rounded-0 bg-transparent text-hawkes-100">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className="bg-main-80">
                  <TableRow>
                    <TableCell className="border-b-main-80">Tx</TableCell>
                    <TableCell className="border-b-main-80">Tick</TableCell>
                    <TableCell className="border-b-main-80">Source</TableCell>
                    <TableCell className="border-b-main-80">Destination</TableCell>
                    <TableCell className="border-b-main-80">Type</TableCell>
                    <TableCell className="border-b-main-80 text-hawkes-100" align="right">
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows().map((row) => (
                    <TableRow
                      key={row.tx}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="border-b-main-80 text-celestial-100"
                      >
                        {formatEllipsis(row.tx)}
                      </TableCell>
                      <TableCell className="border-b-main-80 text-celestial-100">
                        {row.tick}
                      </TableCell>
                      <TableCell className="border-b-main-80 text-celestial-100">
                        {formatEllipsis(row.source)}
                      </TableCell>
                      <TableCell className="border-b-main-80 text-celestial-100">
                        {formatEllipsis(row.destination)}
                      </TableCell>
                      <TableCell className="border-b-main-80">{row.type}</TableCell>
                      <TableCell className="border-b-main-80" align="right">
                        {row.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardItem>
      </div>
    </>
  );
}

export default OverviewPage;
