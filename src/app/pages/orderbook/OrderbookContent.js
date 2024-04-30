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
} from '@mui/material';
import { useSocket } from 'src/app/context/SocketContext';
import CardItem from '../components/CardItem/CardItem';
import AddressText from '../components/common/AddressText';

export default function OrderbookContent() {
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
  const orderbooks = {
    name: 'QX',
    issuer: 'QubicSmartContract',
    bids: [
      ['AIACDIGZQLQSIEKIBJJHMVLQIZMDXSNBUSZBPUXAQDGMGOLUSXZGBISCPYZF', '1', '11111'],
      ['AIACDIGZQLQSIEKIBJJHMVLQIZMDXSNBUSZBPUXAQDGMGOLUSXZGBISCPYZF', '1', '10000'],
    ],
    asks: [
      ['LIYVCGRCGBDMKCPOBSXRJLKFPTABHMQSVWOATAMVGFCTSXXJZZTMLOGCSEKB', '1', '4669'],
      ['LIYVCGRCGBDMKCPOBSXRJLKFPTABHMQSVWOATAMVGFCTSXXJZZTMLOGCSEKB', '1', '4669'],
    ],
  };
  const { orderbook, sendMessage, loading } = useSocket();
  const { token } = useParams();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  useEffect(() => {
    if (token) {
      sendMessage(`orders ${token}`);
    }
  }, [token, sendMessage]);
  console.log('token --->', orderbook, token);
  if (loading) {
    return (
      <div className="absolute w-full md:w-4/5">
        <LinearProgress color="primary" />
      </div>
    );
  }
  return (
    <>
      <CardItem className="flex flex-col lg:flex-row w-full p-4 md:p-12 gap-5 md:gap-16">
        <CardItem className="flex flex-col w-full lg:w-1/2 gap-6 p-4 md:p-16">
          <Typography className="text-20 text-hawkes-100 text-bold font-urb">Buy Order</Typography>
          <TableContainer
            component={Paper}
            className="rounded-0 bg-transparent text-hawkes-100"
            sx={{ maxHeight: 430 }}
          >
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-celestial-20">
                <TableRow>
                  <TableCell className="border-b-main-80 text-white">Side</TableCell>
                  <TableCell className="border-b-main-80 text-white">Address</TableCell>
                  <TableCell className="border-b-main-80 text-white">Quality</TableCell>
                  <TableCell className="border-b-main-80 text-white">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(orderbook?.bids || []).map((row, key) => (
                  <TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                    <TableCell className="border-b-main-80 text-hawkes-100">{row[1]}</TableCell>
                    <TableCell className="border-b-main-80 text-hawkes-100">{row[2]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardItem>
        <CardItem className="flex flex-col w-full lg:w-1/2 gap-6 p-4 md:p-16">
          <Typography className="text-20 text-hawkes-100 text-bold font-urb">Sell Order</Typography>
          <TableContainer
            component={Paper}
            className="rounded-0 bg-transparent text-hawkes-100"
            sx={{ maxHeight: 430 }}
          >
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-celestial-20">
                <TableRow>
                  <TableCell className="border-b-main-80 text-white">Side</TableCell>
                  <TableCell className="border-b-main-80 text-white">Address</TableCell>
                  <TableCell className="border-b-main-80 text-white">Quality</TableCell>
                  <TableCell className="border-b-main-80 text-white">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(orderbook?.asks || []).map((row, key) => (
                  <TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                    <TableCell className="border-b-main-80 text-hawkes-100">{row[1]}</TableCell>
                    <TableCell className="border-b-main-80 text-hawkes-100">{row[2]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardItem>
      </CardItem>
    </>
  );
}
