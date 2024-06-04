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
import { formatString, getTimeAgo } from 'src/app/utils/function';
import CardItem from '../../components/CardItem/CardItem';
import TransactionText from '../../components/common/TransactionText';
import TickText from '../../components/common/TickText';
import AddressText from '../../components/common/AddressText';
import TransactionBox from '../../components/common/TransactionBox';
import Chart from '../../components/Chart';
import EmptyBox from '../../components/EmptyBox';
import CircleProgress from '../../components/common/CircleProgress';
import Pagination from '../tick/Pagination';
import TimeText from '../../components/common/TimeText';

const COUNTPERPAGE = 10;

function OverviewPage() {
  const {
    marketcap,
    emptyticks,
    // currentTick,
    recenttx: socketRecentTx,
    // tokens,
    // loading,
    sendMessage,
    socketSync,
  } = useSocket();

  // const [currentT, setCurrentT] = useState({});
  const [displayRecentTx, setDisplayRecentTx] = useState([]);
  const [mobielDisplayRecentTx, setMobileDisplayRecentTx] = useState([]);
  const [selectedToken, setSelectedToken] = useState(0);
  const [recenttxLoading, setRecenttxLoading] = useState(false);
  const recenttx = useMemo(() => socketRecentTx, [socketRecentTx]);
  const [initLoading, setInitLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  // const [loadCurrentT, setLoadCurrentT] = useState(false);
  const [screenWidth, setScreenWidth] = useState();
  const letterCount = useMemo(() => (screenWidth * 12) / 1920, [screenWidth]);
  const [tokenPrices, setTokenPrices] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const [network, setNetwork] = useState();
  const [scs, setScs] = useState([]);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    sendMessage('marketcap');
    sendMessage('emptyticks 1 100000');
    sendMessage('LKBOPOUKGSYTODWVEPXHUXDTRSOCDOXXXIEAGBJXAGJRMGXRXMCHDNCHWRLK');
    sendMessage('explist');
    sendMessage('prices');
  }, [sendMessage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    const init = async () => {
      const networkResp = await socketSync('network');
      const _scs = await socketSync('explist SC');
      const _tokens = await socketSync('explist');
      setTokens(_tokens.tokens);
      setNetwork(networkResp);
      setScs(_scs.tokens);
    };
    init();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    sendMessage(`recenttx 100 ${selectedToken}`);
    setRecenttxLoading(true);
  }, [selectedToken]);

  useEffect(() => {
    if (recenttx?.recenttx && typeof recenttx?.recenttx === 'object') {
      const indexOfLastItem = pageNum * COUNTPERPAGE;
      const indexOfFirstItem = indexOfLastItem - COUNTPERPAGE;
      setDisplayRecentTx(recenttx?.recenttx.slice(indexOfFirstItem, indexOfLastItem));
      setMobileDisplayRecentTx(recenttx?.recenttx.slice(indexOfFirstItem, indexOfLastItem));
      setRecenttxLoading(false);
      setInitLoading(false);
    }
  }, [recenttx, pageNum]);

  useEffect(() => {
    async function init() {
      if (tokens && tokens.length > 0) {
        /* eslint-disable no-await-in-loop */
        for (let idx = 0; idx < tokens.length; idx += 1) {
          const resp = await socketSync(`orders ${tokens[idx]}`);
          if (resp.name === tokens[idx]) {
            let minAskPrice;
            let maxBidPrice;
            if (resp.asks && resp.asks.length > 0) {
              const askPriceArray = resp.asks.map((subArray) => Number(subArray[2]));
              minAskPrice = Math.min(...askPriceArray);
            }
            if (resp.bids && resp.bids.length > 0) {
              const bidPriceArray = resp.bids.map((subArray) => Number(subArray[2]));
              maxBidPrice = Math.max(...bidPriceArray);
            }
            setTokenPrices((prevPrices) => {
              const updatedPrices = {
                ...prevPrices,
                [resp.name]: [maxBidPrice, minAskPrice],
              };
              return updatedPrices;
            });
          }
        }
        /* eslint-enable no-await-in-loop */
      }
    }
    init();
  }, [tokens]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChangePageNum = (page) => {
    setPageNum(page);
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
        {/* {Object.keys(currentT).length > 0 && (
          <CardItem className="flex py-8 sm:py-12 px-12 sm:px-16 gap-10 items-center bg-celestial-10">
            <img
              className={`w-40 h-40 transition-all duration-500 ease-in-out ${loadCurrentT ? 'rotate-180 opacity-30' : 'rotate-0 opacity-100'
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
                  className={`text-18 text-hawkes-100 transition-all duration-500 ease-in-out ${loadCurrentT ? 'opacity-70' : 'opacity-100'
                    }`}
                  tick={`${currentT.tick}`}
                  link
                />
              </div>
              <Typography
                className={`font-space text-14 text-hawkes-50 ${loadCurrentT ? 'opacity-70' : 'opacity-100'
                  }`}
              >
                {getStandardTime(currentT.utc).toDateString()}
              </Typography>
            </div>
          </CardItem>
        )} */}
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
                  Average block time
                </Typography>
                {network && (
                  <Typography className="font-space text-16 md:text-20 text-hawkes-100">
                    {network.last10 / 10}s
                  </Typography>
                )}
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
        <div className="flex flex-col gap-5 md:gap-8">
          <div className="w-full flex flex-col gap-5 md:gap-8">
            <CardItem className="flex flex-col gap-10 p-16 md:p-32">
              <div className="flex flex-col">
                <Typography className="text-24 md:text-32 font-urb text-hawkes-100">
                  Token Prices
                </Typography>
                <div className="flex flex-wrap justify-center gap-36">
                  {(tokens || []).map((token) => {
                    return (
                      <div className="flex items-center gap-5">
                        <span className="text-[18px]">{token}</span>
                        {tokenPrices[token] && (
                          <div className="flex flex-col text-[12px]">
                            <span>{formatString(tokenPrices[token][0])}</span>
                            <span>{formatString(tokenPrices[token][1])}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardItem>
          </div>
          <div className="w-full flex flex-col gap-5 md:gap-8">
            <CardItem className="flex flex-col gap-10 p-16 md:p-32">
              <div className="flex items-center justify-between">
                <Typography className="text-24 md:text-32 font-urb text-hawkes-100">
                  Recent Transactions
                </Typography>
                {scs[selectedToken] && (
                  <Autocomplete
                    disablePortal
                    defaultValue={{
                      value: selectedToken,
                      label: scs[selectedToken],
                    }}
                    options={scs.map((token, key) => ({
                      value: key,
                      label: token,
                    }))}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
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
                )}
              </div>
              <div>
                <Hidden mdUp>
                  {recenttxLoading ? (
                    <CircleProgress />
                  ) : (
                    <div className="flex flex-col gap-2 max-h-360 overflow-auto">
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
                  >
                    <Table stickyHeader sx={{ minWidth: 800 }} aria-label="simple table">
                      <TableHead className="bg-celestial-20">
                        <TableRow>
                          <TableCell className="border-b-main-80 text-hawkes-100">Tx</TableCell>
                          <TableCell className="border-b-main-80 text-hawkes-100">Tick</TableCell>
                          <TableCell className="border-b-main-80 text-hawkes-100">Time</TableCell>
                          <TableCell className="border-b-main-80 text-hawkes-100">Source</TableCell>
                          <TableCell className="border-b-main-80 text-hawkes-100">
                            Destination
                          </TableCell>
                          {/* <TableCell className="border-b-main-80 text-hawkes-100">Type</TableCell> */}
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
                                  letter={letterCount}
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
                                {/* getTimeAgo(currentTime, row.utc * 1000) */}
                                <TimeText
                                  utcTime={row.utc}
                                  readableTime={getTimeAgo(currentTime, row.utc * 1000)}
                                  className="text-white text-16"
                                  copy
                                />
                              </TableCell>
                              <TableCell className="border-b-main-80 text-celestial-100">
                                <AddressText address={row.src} letter={letterCount} copy link />
                              </TableCell>
                              <TableCell className="border-b-main-80 text-celestial-100">
                                <AddressText address={row.dest} letter={letterCount} copy link />
                              </TableCell>
                              {/* <TableCell className="border-b-main-80">{row.type}</TableCell> */}
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
              {recenttx?.recenttx && (
                <Pagination
                  count={Math.ceil(recenttx?.recenttx.length / COUNTPERPAGE)}
                  handleChangePageNum={handleChangePageNum}
                />
              )}
            </CardItem>
            {/* <CardItem className="flex flex-col gap-10 p-8 md:p-20">
              <TokenBarChart />
            </CardItem> */}
          </div>
          <div className="w-full flex flex-col gap-5 md:gap-10">
            <CardItem className="flex flex-col gap-10 p-8 md:p-20">
              <Typography className="text-24 md:text-32 font-urb text-hawkes-100">
                Empty Ticks{' '}
                <sapn className="text-20">{`(${emptyticks.begintick} - ${emptyticks.endtick})`}</sapn>
              </Typography>
              <div className="flex flex-wrap w-full gap-12 max-h-[310px] justify-center overflow-auto">
                {(emptyticks?.emptyticks || []).map((tick, key) => {
                  return (
                    <TickText
                      className="text-16 text-main-40 hover:text-white"
                      tick={tick}
                      key={key}
                      link
                    />
                  );
                })}
              </div>
            </CardItem>
          </div>
        </div>
      </div>
    </>
  );
}

export default OverviewPage;
