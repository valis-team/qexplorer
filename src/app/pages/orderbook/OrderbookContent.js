import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Paper,
  LinearProgress,
  useMediaQuery,
} from '@mui/material';
import { useSocket } from 'src/app/context/SocketContext';
import { formatString } from 'src/app/utils/function';
import CardItem from '../components/CardItem/CardItem';
import AddressText from '../components/common/AddressText';
import EmptyBox from '../components/EmptyBox';
import CircleProgress from '../components/common/CircleProgress';

export default function OrderbookContent() {
  const isMobile = useMediaQuery('(max-width:768px)');
  const { orderbook, sendMessage, loading } = useSocket();
  const { token } = useParams();
  const [disaplyBuyOrder, setDisaplayBuyOrder] = useState([]);
  const [displaySallOrder, setDisaplaySallOrder] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    setDisaplayBuyOrder((orderbook?.bids || []).slice(0, 15));
    setDisaplaySallOrder((orderbook?.asks || []).slice(0, 15));
    setInitLoading(false);
    setTableLoading(false);
  }, [orderbook]);
  useEffect(() => {
    if (token) {
      sendMessage(`orders ${token}`);
      setTableLoading(true);
    }
  }, [token, sendMessage]);

  const handleBuyScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 5) {
      const newLength = disaplyBuyOrder.length + 5;
      if ((orderbook?.bids || []).length >= newLength) {
        setDisaplayBuyOrder((orderbook?.bids || []).slice(0, newLength));
      }
    }
  };

  const handleSallScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 5) {
      const newLength = displaySallOrder.length + 5;
      if ((orderbook?.asks || []).length >= newLength) {
        setDisaplaySallOrder((orderbook?.asks || []).slice(0, newLength));
      }
    }
  };

  if (initLoading) {
    return (
      <div className="absolute w-full md:w-4/5">
        <LinearProgress color="primary" />
      </div>
    );
  }
  return (
    <div className="flex min-h-[500px] h-full w-full justify-center items-center px-8 md:px-32">
      <CardItem className="flex flex-col lg:flex-row w-full p-4 md:p-12 gap-5 md:gap-16">
        <CardItem className="flex flex-col w-full lg:w-1/2 gap-6 p-4 md:p-16">
          <Typography className="text-20 text-hawkes-100 text-bold font-urb">Buy Order</Typography>
          {tableLoading ? (
            <CircleProgress />
          ) : (
            <TableContainer
              component={Paper}
              className="rounded-0 bg-transparent text-hawkes-100"
              onScroll={handleBuyScroll}
              sx={{ maxHeight: 600 }}
            >
              <Table stickyHeader sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead className="bg-celestial-20">
                  <TableRow>
                    <TableCell className="border-b-main-80 text-white">Side</TableCell>
                    <TableCell className="border-b-main-80 text-white">Buyer</TableCell>
                    <TableCell className="border-b-main-80 text-white">Quality</TableCell>
                    <TableCell className="border-b-main-80 text-white">QU Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {disaplyBuyOrder.length > 0 ? (
                    disaplyBuyOrder.map((row, key) => (
                      <TableRow
                        key={row}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className="border-b-main-80 text-hawkes-100"
                        >{`Buy ${key + 1}`}</TableCell>
                        <TableCell className="border-b-main-80">
                          <AddressText
                            address={row[0]}
                            className="text-hawkes-100 text-14"
                            letter={isMobile ? 4 : 8}
                            link
                            copy
                          />
                        </TableCell>
                        <TableCell className="border-b-main-80 text-hawkes-100 text-12 md:text-14">
                          {formatString(row[1])}
                        </TableCell>
                        <TableCell className="border-b-main-80 text-hawkes-100 text-12 md:text-14">
                          {formatString(row[2])}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <EmptyBox />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardItem>
        <CardItem className="flex flex-col w-full lg:w-1/2 gap-6 p-4 md:p-16">
          <Typography className="text-20 text-hawkes-100 text-bold font-urb">Sell Order</Typography>
          {tableLoading ? (
            <CircleProgress />
          ) : (
            <TableContainer
              component={Paper}
              onScroll={handleSallScroll}
              className="rounded-0 bg-transparent text-hawkes-100"
              sx={{ maxHeight: 600 }}
            >
              <Table stickyHeader sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead className="bg-celestial-20">
                  <TableRow>
                    <TableCell className="border-b-main-80 text-white">Side</TableCell>
                    <TableCell className="border-b-main-80 text-white">Saller</TableCell>
                    <TableCell className="border-b-main-80 text-white">Quality</TableCell>
                    <TableCell className="border-b-main-80 text-white">QU Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displaySallOrder.length > 0 ? (
                    displaySallOrder.map((row, key) => (
                      <TableRow
                        key={row}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className="border-b-main-80 text-hawkes-100"
                        >{`Sell ${key + 1}`}</TableCell>
                        <TableCell className="border-b-main-80">
                          <AddressText
                            address={row[0]}
                            className="text-hawkes-100 text-14"
                            letter={isMobile ? 4 : 8}
                            copy
                            link
                          />
                        </TableCell>
                        <TableCell className="border-b-main-80 text-hawkes-100 text-12 md:text-14">
                          {formatString(row[1])}
                        </TableCell>
                        <TableCell className="border-b-main-80 text-hawkes-100 text-12 md:text-14">
                          {formatString(row[2])}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <EmptyBox />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardItem>
      </CardItem>
    </div>
  );
}
