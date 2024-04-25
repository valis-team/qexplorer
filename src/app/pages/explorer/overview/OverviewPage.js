import { useEffect, useState } from 'react';
import { Typography, LinearProgress, Hidden, Autocomplete, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSocket } from 'src/app/context/SocketContext';
import { formatString } from 'src/app/utils/function';
import CardItem from '../../components/CardItem/CardItem';
import TransactionText from '../../components/common/TransactionText';
import TickText from '../../components/common/TickText';
import AddressText from '../../components/common/AddressText';
import TransactionBox from '../../components/common/TransactionBox';

function OverviewPage() {
  const { marketcap, emptyticks, currentTick, recenttx, tokens, loading, sendMessage } =
    useSocket();

  const [currentT, setCurrentT] = useState({});
  const [initLoad, setInitLoad] = useState(true);
  const [selectedToken, setSelectedToken] = useState(0);
  const [loadCurrentT, setLoadCurrentT] = useState(false);
  useEffect(() => {
    sendMessage('marketcap');
    sendMessage('emptyticks 1 100000');
    sendMessage('LKBOPOUKGSYTODWVEPXHUXDTRSOCDOXXXIEAGBJXAGJRMGXRXMCHDNCHWRLK');
    sendMessage('tokenlist');
  }, [sendMessage]);
  useEffect(() => {
    sendMessage(`recenttx 10000 ${selectedToken}`);
  }, [selectedToken]);
  useEffect(() => {
    setLoadCurrentT(true);
    setTimeout(() => {
      setCurrentT(currentTick);
      setLoadCurrentT(false);
    }, 500);
  }, [currentTick]);

  if (loading && initLoad) {
    setInitLoad(false);
    return (
      <div className="w-full md:w-4/5 absolute">
        <LinearProgress color="primary" />
      </div>
    );
  }
  const rows = () => {
    return (recenttx.recenttx || []).slice(0, 5);
  };
  return (
    <>
      <div className="container px-12 py-24 md:px-24 flex flex-col gap-10">
        <CardItem className="flex flex-col gap-10 p-16 md:p-32">
          <Typography className="text-32 text-hawkes-100 text-bold font-urb">Overview</Typography>
          <div className="flex gap-10 flex-wrap">
            <CardItem className="flex py-8 sm:py-12 px-12 sm:px-16 gap-10 items-center w-[255px] bg-celestial-10">
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
            <CardItem className="flex py-8 sm:py-12 px-12 sm:px-16 gap-10 items-center w-[255px] bg-celestial-10">
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
            <CardItem className="flex py-8 sm:py-12 px-12 sm:px-16 gap-10 items-center min-w-[255px] bg-celestial-10">
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
        <div className="flex flex-col md:flex-row gap-5 md:gap-8">
          <div className="w-full md:w-1/3 flex flex-col gap-5 md:gap-">
            <CardItem className="flex flex-col gap-10 p-8 md:p-20">
              <Typography className="text-24 md:text-32 font-urb text-hawkes-100">
                Ticks{' '}
                <sapn className="text-20">{`(${emptyticks.begintick} - ${emptyticks.endtick})`}</sapn>
              </Typography>
              <div className="flex gap-6 flex-wrap">
                {(emptyticks?.emptyticks || []).slice(0, 50).map((tick, key) => {
                  return <TickText className="text-16 text-main-40" tick={tick} key={key} link />;
                })}
              </div>
            </CardItem>
            {Object.keys(currentT).length > 0 && (
              <CardItem className="flex py-8 sm:py-12 px-12 sm:px-16 gap-10 items-center bg-celestial-10">
                <img
                  className={`w-40 h-40 transition-all duration-500 ease-in-out ${
                    loadCurrentT ? 'rotate-180 opacity-30' : 'rotate-0 opacity-100'
                  }`}
                  src="assets/icons/tick_mark.svg"
                  alt="icon"
                />
                <div className="flex flex-col items-center">
                  <div className="flex items-end">
                    <Typography className="text-14 text-hawkes-30 font-urb w-full flex justify-start">
                      Current Tick #
                    </Typography>
                    <TickText
                      className={`text-14 text-hawkes-50 transition-all duration-500 ease-in-out ${
                        loadCurrentT ? 'opacity-70' : 'opacity-100'
                      }`}
                      tick={`${currentT.tick}`}
                      link
                    />
                  </div>
                  <Typography
                    className={`font-space text-16 md:text-20 text-hawkes-100 ${
                      loadCurrentT ? 'opacity-70' : 'opacity-100'
                    }`}
                  >
                    {currentT.utc}
                  </Typography>
                </div>
              </CardItem>
            )}
          </div>
          <div className="w-full md:w-2/3">
            <CardItem className="flex flex-col gap-10 p-16 md:p-32">
              <div className="flex items-center justify-between">
                <Typography className="text-24 md:text-32 font-urb text-hawkes-100">
                  Recent Transactions
                </Typography>
                <Autocomplete
                  disablePortal
                  defaultValue={{ value: 0, label: 'QU' }}
                  options={(tokens || []).map((token, key) => ({
                    value: key,
                    label: token,
                  }))}
                  sx={{
                    width: 200,
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d2e0fc4d',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#D2E0FC',
                    },
                  }}
                  onChange={(e, val) => setSelectedToken(val.value)}
                  renderInput={(params) => <TextField {...params} label="TOKEN" />}
                />
              </div>
              <Hidden mdUp>
                {rows().map((item, key) => (
                  <div key={key} className="py-4 border-b-1">
                    <TransactionBox {...item} />
                  </div>
                ))}
              </Hidden>
              <Hidden mdDown>
                <TableContainer
                  component={Paper}
                  className="rounded-0 bg-transparent text-hawkes-100"
                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="bg-celestial-20">
                      <TableRow>
                        <TableCell className="border-b-main-80 text-hawkes-100">Tx</TableCell>
                        <TableCell className="border-b-main-80 text-hawkes-100">Tick</TableCell>
                        <TableCell className="border-b-main-80 text-hawkes-100">Source</TableCell>
                        <TableCell className="border-b-main-80 text-hawkes-100">
                          Destination
                        </TableCell>
                        <TableCell className="border-b-main-80 text-hawkes-100">Type</TableCell>
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
                            <TransactionText
                              className="text-16"
                              tx={row.txid}
                              letter={4}
                              copy
                              link
                            />
                          </TableCell>
                          <TableCell className="border-b-main-80 text-celestial-100">
                            <TickText tick={row.tick} className="text-white text-16" copy link />
                          </TableCell>
                          <TableCell className="border-b-main-80 text-celestial-100">
                            <AddressText address={row.src} letter={4} copy link />
                          </TableCell>
                          <TableCell className="border-b-main-80 text-celestial-100">
                            <AddressText address={row.dest} letter={4} copy link />
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
              </Hidden>
            </CardItem>
          </div>
        </div>
      </div>
    </>
  );
}

export default OverviewPage;
