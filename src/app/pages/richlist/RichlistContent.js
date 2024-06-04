import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSocket } from 'src/app/context/SocketContext';
import { useParams } from 'react-router-dom';
import { formatString } from 'src/app/utils/function';
import AddressText from '../components/common/AddressText';
import EmptyBox from '../components/EmptyBox';
import CircleProgress from '../components/common/CircleProgress';
import Pagination from '../explorer/tick/Pagination';

const COUNTPERPAGE = 10;

function RichlistContent() {
  const { richlist, loading, sendMessage } = useSocket();
  const { token } = useParams();
  const [displayRichList, setDisplayRichList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);

  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    if (richlist && typeof richlist === 'object') {
      const indexOfLastItem = pageNum * COUNTPERPAGE;
      const indexOfFirstItem = indexOfLastItem - COUNTPERPAGE;
      setDisplayRichList(richlist.slice(indexOfFirstItem, indexOfLastItem));
      setInitLoading(false);
      setTableLoading(false);
    }
  }, [richlist, pageNum]);

  useEffect(() => {
    if (token === 'QU') {
      sendMessage('richlist');
    } else {
      sendMessage(`richlist.${token}`);
    }
    setTableLoading(true);
  }, [token, sendMessage]);

  const handleChangePageNum = (page) => {
    setPageNum(page);
  };

  if (initLoading) {
    return (
      <div className="absolute w-full md:w-4/5">
        <LinearProgress color="primary" />
      </div>
    );
  }

  return (
    <Box className="container flex justify-center px-8">
      <div className="flex w-full border-1 border-main-50 flex-col p-12 max-w-[1220px]">
        {tableLoading ? (
          <CircleProgress />
        ) : (
          <>
            <TableContainer
              component={Paper}
              className="rounded-0 bg-transparent text-hawkes-100"
              sx={{ maxHeight: 650 }}
            >
              <Table stickyHeader sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead className="bg-celestial-20">
                  <TableRow>
                    <TableCell className="border-b-main-80 text-white">No</TableCell>
                    <TableCell className="border-b-main-80 text-white">Address</TableCell>
                    <TableCell className="border-b-main-80 text-white" align="right">
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayRichList.length > 0 ? (
                    displayRichList.map((row, key) => (
                      <TableRow
                        key={key}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className="border-b-main-80 text-hawkes-100"
                        >
                          {row[0]}
                        </TableCell>
                        <TableCell className="border-b-main-80">
                          <AddressText
                            address={row[1]}
                            className="text-hawkes-100 text-14"
                            letter={isMobile ? 4 : null}
                            link
                            copy
                          />
                        </TableCell>
                        <TableCell
                          className="border-b-main-80 text-hawkes-100 font-mono"
                          align="right"
                        >
                          {formatString(row[2])}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <EmptyBox />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {richlist && (
              <Pagination
                count={Math.ceil(richlist.length / COUNTPERPAGE)}
                handleChangePageNum={handleChangePageNum}
              />
            )}
          </>
        )}
      </div>
    </Box>
  );
}

export default RichlistContent;
