import * as React from 'react';
import _ from 'lodash';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useSocket } from 'src/app/context/SocketContext';
import AddressText from './common/AddressText';
import TransactionText from './common/TransactionText';
import TickText from './common/TickText';

function AddressTableRow(props) {
  const { socketSync } = useSocket();
  const { row, idx, hoverIdx, setHoverIdx } = props;
  const [itemLoading, setItemLoading] = React.useState(false);
  const [sctx, setSctx] = React.useState();

  const handleMouseEnter = React.useCallback(
    _.throttle(async (a, item, index) => {
      setHoverIdx(index);
      setItemLoading(true);
      const command = `${item[1]} ${item[0]}`;
      try {
        const resp = await socketSync(command);
        setSctx(JSON.stringify(resp.sctx));
      } catch (error) {
        console.log(error);
      } finally {
        setItemLoading(false);
      }
    }, 100),
    []
  );

  const handleMouseLeave = () => {
    setHoverIdx(undefined);
    setSctx(undefined);
    setItemLoading(false);
  };

  return (
    <>
      <TableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        className="relative"
        onMouseEnter={(e) => {
          if (row[2].startsWith('BAAAAAAA')) handleMouseEnter(e, row, idx);
        }}
        onMouseLeave={handleMouseLeave}
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
        {hoverIdx === idx && sctx && row[2].startsWith('BAAAAAAA') && (
          <TableCell className="absolute bg-white text-black border border-gray-300 shadow-lg p-2 max-w-[300px] bottom-5 left-5 break-words overflow-hidden whitespace-normal z-10">
            {itemLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
            ) : (
              sctx
            )}
          </TableCell>
        )}
      </TableRow>
    </>
  );
}

export default AddressTableRow;
