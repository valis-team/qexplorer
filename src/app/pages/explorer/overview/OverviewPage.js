import { useEffect, useMemo, useState } from 'react';
import { Typography, LinearProgress, Hidden, Autocomplete, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSocket } from 'src/app/context/SocketContext';
import { formatString, getStandardTime } from 'src/app/utils/function';
import CardItem from '../../components/CardItem/CardItem';
import TransactionText from '../../components/common/TransactionText';
import TickText from '../../components/common/TickText';
import AddressText from '../../components/common/AddressText';
import TransactionBox from '../../components/common/TransactionBox';
import Chart from '../../components/Chart';
import EmptyBox from '../../components/EmptyBox';
import CircleProgress from '../../components/common/CircleProgress';
import TokenBarChart from '../../components/TokenBarChart';

function OverviewPage() {
  const {
    marketcap,
    emptyticks,
    currentTick,
    recenttx: socketRecentTx,
    tokens: socketTokens,
    prices: socketPrices,
    loading,
    sendMessage,
  } = useSocket();

  const [currentT, setCurrentT] = useState({});
  const [displayRecentTx, setDisplayRecentTx] = useState([]);
  const [mobielDisplayRecentTx, setMobileDisplayRecentTx] = useState([]);
  const [selectedToken, setSelectedToken] = useState(0);
  const [recenttxLoading, setRecenttxLoading] = useState(false);
  const recenttx = useMemo(() => socketRecentTx, [socketRecentTx]);
  const [initLoading, setInitLoading] = useState(true);
  const [loadCurrentT, setLoadCurrentT] = useState(false);
  const tokens = useMemo(
    () => (socketTokens || []).filter((item) => item !== 'QWALLET' && item !== 'QFT'),
    [socketTokens]
  );

  // console.log('prices ---->', prices);
  useEffect(() => {
    sendMessage('marketcap');
    sendMessage('emptyticks 1 100000');
    sendMessage('LKBOPOUKGSYTODWVEPXHUXDTRSOCDOXXXIEAGBJXAGJRMGXRXMCHDNCHWRLK');
    sendMessage('tokenlist');
    sendMessage('prices');
  }, [sendMessage]);

  useEffect(() => {
    sendMessage(`recenttx 10000 ${selectedToken}`);
    setRecenttxLoading(true);
  }, [selectedToken]);

  useEffect(() => {
    setLoadCurrentT(true);
    setTimeout(() => {
      setCurrentT(currentTick);
      setLoadCurrentT(false);
    }, 500);
  }, [currentTick]);

  useEffect(() => {
    if (recenttx?.recenttx) {
      setDisplayRecentTx((recenttx?.recenttx || []).slice(0, 10));
      setMobileDisplayRecentTx((recenttx?.recenttx || []).slice(0, 10));
      setRecenttxLoading(false);
      setInitLoading(false);
    }
  }, [recenttx]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 5) {
      const newLength = displayRecentTx.length + 5;
      if ((recenttx?.recenttx || []).length >= newLength) {
        setDisplayRecentTx((recenttx?.recenttx || []).slice(0, newLength));
      }
    }
  };

  const handleMobileScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      const newLength = mobielDisplayRecentTx.length + 5;
      if ((recenttx?.recenttx || []).length >= newLength) {
        setMobileDisplayRecentTx((recenttx?.recenttx || []).slice(0, newLength));
      }
    }
  };

  if (initLoading) {
    return (
      <div className="w-full md:w-4/5 absolute">
        <LinearProgress color="primary" />
      </div>
    );
  }
  return (
    <>
      <div className="container px-12 py-20 md:px-24 flex flex-col gap-10 max-h-[calc(100vh-76px)] overflow-y-auto">
        <div className="flex items-center gap-6 pl-10">
          <img className="w-24 md:w-36 h-24 md:h-36" src="assets/icons/mainbrand.svg" alt="icon" />
          <Typography className="text-hawkes-100 text-24 md:text-28 font-urb text-bold">
            Overview
          </Typography>
        </div>
        <CardItem className="flex flex-col xl:flex-row justify-center xl:justify-between gap-10 p-16 md:p-24">
          <div className="flex flex-col gap-10 justify-center">
            <div className="flex w-full justify-center ml-0 lg:ml-40">
              <Chart />
            </div>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <CardItem className="flex py-8 sm:py-12 px-12 sm:px-16 gap-10 items-center min-w-[255px] bg-celestial-10">
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
            <CardItem className="flex py-8 sm:py-12 px-12 sm:px-16 gap-10 items-center min-w-[255px] bg-celestial-10">
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
              <img className="w-44 h-44" src="assets/icons/transaction_mark_blue.svg" alt="icon" />
              <div className="flex flex-col">
                <Typography className="text-14 text-hawkes-30 font-urb w-full flex justify-start">
                  Recent Transaction
                </Typography>
                <Typography className="font-space text-16 md:text-20 text-hawkes-100">
                  {(recenttx?.recenttx || []).length}
                </Typography>
              </div>
            </CardItem>
            <CardItem className="flex py-8 sm:py-12 px-12 sm:px-16 gap-10 items-center min-w-[255px] bg-celestial-10">
              <img className="w-40 h-40" src="assets/icons/supply.svg" alt="icon" />
              <div className="flex flex-col items-center">
                <Typography className="text-14 text-hawkes-30 font-urb w-full flex justify-start">
                  Supply
                </Typography>
                <Typography className="font-space py-2 text-16 md:text-15 text-hawkes-100">
                  {formatString(marketcap?.supply)}
                </Typography>
              </div>
            </CardItem>
            {/* <CardItem className="flex py-8 sm:py-12 px-12 sm:px-16 gap-10 items-center w-[310px] bg-celestial-10">
              <img className="w-36 h-36" src="assets/icons/tick_mark_blue.svg" alt="icon" />
              <div className="flex flex-col">
                <Typography className="text-14 text-hawkes-30 font-urb w-full flex justify-start">
                  Empty Ticks
                </Typography>
                <Typography className="font-space text-16 md:text-20 text-hawkes-100">
                  {(emptyticks?.emptyticks || []).length}
                </Typography>
              </div>
            </CardItem> */}
          </div>
        </CardItem>
        <div className="flex flex-col md:flex-row gap-5 md:gap-8">
          <div className="w-full md:w-1/3 flex flex-col gap-5 md:gap-10">
            <CardItem className="flex flex-col gap-10 p-8 md:p-20">
              <Typography className="text-24 md:text-32 font-urb text-hawkes-100">
                QWallet Dashboard
              </Typography>
              <TokenBarChart />
            </CardItem>
            <CardItem className="flex flex-col gap-10 p-8 md:p-20">
              <Typography className="text-24 md:text-32 font-urb text-hawkes-100">
                Empty Ticks{' '}
                <sapn className="text-20">{`(${emptyticks.begintick} - ${emptyticks.endtick})`}</sapn>
              </Typography>
              <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-[310px] justify-between overflow-auto">
                {(emptyticks?.emptyticks || []).map((tick, key) => {
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
                      className={`text-18 text-hawkes-100 transition-all duration-500 ease-in-out ${
                        loadCurrentT ? 'opacity-70' : 'opacity-100'
                      }`}
                      tick={`${currentT.tick}`}
                      link
                    />
                  </div>
                  <Typography
                    className={`font-space text-14 text-hawkes-50 ${
                      loadCurrentT ? 'opacity-70' : 'opacity-100'
                    }`}
                  >
                    {getStandardTime(currentT.utc).toDateString()}
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
                  defaultValue={{
                    value: selectedToken,
                    label: ['QU', ...(tokens || [])][selectedToken],
                  }}
                  options={['QU', ...(tokens || [])].map((token, key) => ({
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
                  renderInput={(params) => <TextField {...params} label="SC" />}
                />
              </div>
              <div>
                <Hidden mdUp>
                  {recenttxLoading ? (
                    <CircleProgress />
                  ) : (
                    <div
                      className="flex flex-col gap-2 max-h-360 overflow-auto"
                      onScroll={handleMobileScroll}
                    >
                      {mobielDisplayRecentTx.map((item, key) => (
                        <div key={key} className="py-4 border-b-1">
                          <TransactionBox {...item} />
                        </div>
                      ))}
                    </div>
                  )}
                </Hidden>
              </div>
              <Hidden mdDown>
                {recenttxLoading ? (
                  <CircleProgress />
                ) : (
                  <TableContainer
                    component={Paper}
                    className="rounded-0 bg-transparent text-hawkes-100"
                    sx={{ maxHeight: 350 }}
                    onScroll={handleScroll}
                  >
                    <Table stickyHeader sx={{ minWidth: 800 }} aria-label="simple table">
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
                        {displayRecentTx.length > 0 ? (
                          displayRecentTx.map((row, key) => (
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
                                <TickText
                                  tick={row.tick}
                                  className="text-white text-16"
                                  copy
                                  link
                                />
                              </TableCell>
                              <TableCell className="border-b-main-80 text-celestial-100">
                                <AddressText address={row.src} letter={4} copy link />
                              </TableCell>
                              <TableCell className="border-b-main-80 text-celestial-100">
                                <AddressText address={row.dest} letter={4} copy link />
                              </TableCell>
                              <TableCell className="border-b-main-80">{row.type}</TableCell>
                              <TableCell className="border-b-main-80" align="right">
                                {formatString(row.amount)}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6}>
                              <EmptyBox />
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Hidden>
            </CardItem>
          </div>
        </div>
      </div>
    </>
  );
}

export default OverviewPage;
