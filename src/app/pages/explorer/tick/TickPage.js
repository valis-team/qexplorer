import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { useSocket } from 'src/app/context/SocketContext';
import LinearProgress from '../../components/common/LinearProgress';
import CardItem from '../../components/CardItem/CardItem';
import TransactionBox from '../../components/common/TransactionBox';
import EmptyBox from '../../components/EmptyBox';
import Pagination from './Pagination';

const COUNTPERPAGE = 10;

function TickPage() {
  const { tick: tickId } = useParams();
  const { tick, loading, sendMessage } = useSocket();
  const [tickData, setTickData] = useState();
  const [displayTx, setDisplayTx] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const handleChangePageNum = (page) => {
    setPageNum(page);
  };

  useEffect(() => {
    if (tickId) {
      sendMessage(tickId);
    }
  }, [tickId]);

  useEffect(() => {
    if (+tickId === +tick?.tick) {
      setTickData(tick);
    }
  }, [tick]);

  useEffect(() => {
    if (tick && typeof tick.tx === 'object') {
      const indexOfLastItem = pageNum * COUNTPERPAGE;
      const indexOfFirstItem = indexOfLastItem - COUNTPERPAGE;
      setDisplayTx(tick.tx.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [tick, pageNum]);

  if (loading) {
    return <LinearProgress />;
  }
  return (
    <Box className="container p-8 md:p-20 flex flex-col gap-20 overflow-y-auto">
      <CardItem className="flex w-full flex-col p-4 md:p-12 gap-5 md:gap-16">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-6">
            <img
              className="w-24 md:w-28 h-24 md:h-28"
              src="assets/icons/tick_mark.svg"
              alt="icon"
            />
            <Typography className="text-hawkes-100 text-20 font-urb text-bold">
              Tick# {tickData?.tick || ''}
            </Typography>
          </div>
          <div className="flex gap-4">
            <Link
              className="px-5 py-3 bg-celestial-20"
              to={`/explorer/tick/${+tickData?.tick - 1}`}
            >
              <img className="w-16 h-16" src="assets/icons/arrow_right.svg" alt="icon" />
            </Link>
            <Link
              className="px-5 py-3 bg-celestial-20"
              to={`/explorer/tick/${+tickData?.tick + 1}`}
            >
              <img className="w-16 h-16" src="assets/icons/arrow_left.svg" alt="icon" />
            </Link>
          </div>
        </div>
        <div className="flex p-8 md:p-24 gap-8 md:gap-20 justify-center lg:justify-start flex-wrap">
          <CardItem className="flex py-8 sm:py-12 px-4 sm:px-16 gap-5 md:gap-10 items-center bg-celestial-10">
            <img className="w-32 md:w-40 h-32 md:h-40" src="assets/icons/trade.svg" alt="icon" />
            <div className="flex flex-col items-center">
              <Typography className="text-14 text-hawkes-30 font-urb w-full flex justify-start">
                Spectrum
              </Typography>
              <Typography className="font-space w-[290px] md:w-[400px] text-14 md:text-16 text-hawkes-100 break-words">
                {tickData?.spectrum || ''}
              </Typography>
            </div>
          </CardItem>
          <CardItem className="flex py-8 sm:py-12 px-4 sm:px-16 gap-5 md:gap-10 items-center bg-celestial-10">
            <img className="w-32 md:w-40 h-32 md:h-40" src="assets/icons/donate.svg" alt="icon" />
            <div className="flex flex-col items-center">
              <Typography className="text-14 text-hawkes-30 font-urb w-full flex justify-start">
                Qchain
              </Typography>
              <Typography className="font-space w-[290px] md:w-[400px] text-14 md:text-16 text-hawkes-100 break-words">
                {tickData?.qchain || ''}
              </Typography>
            </div>
          </CardItem>
        </div>
      </CardItem>
      <CardItem className="flex w-full flex-col p-4 md:p-12 gap-5 md:gap-16">
        <div className="flex items-center gap-6">
          <img
            className="w-24 md:w-28 h-24 md:h-28"
            src="assets/icons/transaction_mark.webp"
            alt="icon"
          />
          <Typography className="text-hawkes-100 text-20 font-urb text-bold">
            Transactions
          </Typography>
        </div>
        <div className="flex flex-col gap-4 md:gap-8 max-h-[500px] overflow-y-auto">
          {tick.tx && tick.tx.length > 0 ? (
            displayTx.map((item, key) => {
              return (
                <div key={key} className="py-4 border-b-1">
                  <TransactionBox {...item} />
                </div>
              );
            })
          ) : (
            <div className="h-120 flex w-full justify-center items-center">
              <EmptyBox />
            </div>
          )}
        </div>
        {tick.tx && (
          <Pagination
            count={Math.ceil(tick.tx.length / COUNTPERPAGE)}
            handleChangePageNum={handleChangePageNum}
          />
        )}
      </CardItem>
    </Box>
  );
}

export default TickPage;
