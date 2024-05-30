import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useSocket } from 'src/app/context/SocketContext';
import AddressText from './common/AddressText';
import TransactionText from './common/TransactionText';
import TickText from './common/TickText';

function AddressTableRow(props) {
  const { socketSync } = useSocket();
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  // const handleMouseEnter = useCallback(_.throttle(async (_, item, idx) => {
  //   setItemLoading(true);
  //   setHoverIdx(idx);
  //   const command = `${item[1]} ${item[0]}`;
  //   try {
  //     const resp = await axios.post(`${SERVER_URL}/api/call-socket`, { command });
  //     setHoverItem(JSON.stringify(resp.data.sctx));
  //     console.log(JSON.stringify(resp.data.sctx));
  //   } catch (error) {

  //   } finally {
  //     setItemLoading(false);
  //   }
  // }, 100), []);

  // const handleMouseLeave = () => {
  //   setHoverIdx(undefined);
  //   setHoverItem(undefined);
  // };

  const handleClick = async () => {
    const resp = await socketSync(
      `history HZKGWJFHPUGRIBMZQBTHPXVQOGLANSERJVWIQYONFHJWAFJRATWHZIQFIYRM`
    );
    console.log(resp);
  };

  return (
    <>
      <TableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onClick={handleClick}
        // onMouseEnter={(e) => { handleMouseEnter(e, item, idx) }}
        // onMouseLeave={handleMouseLeave}
      >
        <TableCell component="th" scope="row" className="border-b-main-80">
          <TickText className="text-white" tick={row[0]} copy link />
        </TableCell>
        <TableCell component="th" scope="row" className="border-b-main-80">
          <TransactionText tx={row[1]} copy letter={20} link />
        </TableCell>
        <TableCell component="th" scope="row" className="border-b-main-80">
          <AddressText address={row[2]} copy letter={20} link />
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          className="border-b-main-80 text-white cursor-pointer"
        >
          <TickText className="text-white" tick={row[3]} copy />
        </TableCell>
        {/* {hoverIdx != undefined && hoverIdx == idx && row[2].startsWith('BAAAAAAA') &&
          <div
            className="absolute bg-white text-black border border-gray-300 shadow-lg p-2 max-w-[300px] top-0 left-0 break-words overflow-hidden whitespace-normal z-10"
          >
            {itemLoading ?
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div> :
              hoverItem
            }
          </div>
        } */}
      </TableRow>
    </>
  );
}

export default AddressTableRow;
