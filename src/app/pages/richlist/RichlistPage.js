import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { Typography } from '@mui/material';
import Card from 'src/app/components/Card/Card';
import { useSocket } from 'src/app/context/SocketContext';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RichlistHeader from './RichlistHeader';
import reducer from './store';
import { selectRichlist, selectTokens, setTokens, setRichlist } from './store/richlistSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function RichlistPage() {
  const socket = useSocket();
  const socketTest = (event) => {
    socket.sendMessage('help');
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      socketTest();
    }
  };

  console.log(useSelector(selectTokens));
  console.log(useSelector(selectRichlist));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTokens(['QU', 'QTRY']));
    dispatch(
      setRichlist([
        ['1', 'QTRY'],
        ['2', 'QTRY'],
      ])
    );
  }, [dispatch]);
  return (
    <Root
      header={<RichlistHeader />}
      content={
        <div className="container px-12 lg:px-24">
          <Card className="p-12 md:p-24">
            <div className="flex justify-between items-center">
              <Typography className="w-20 md:w-60 text-14 md:text-20">No.</Typography>
              <Typography className="flex flex-1 text-14 md:text-20">Address</Typography>
              <Typography className="text-14 md:text-20">Amount</Typography>
            </div>
            <div className="flex">
              <Typography className="w-20 md:w-60 text-14 md:text-20">1</Typography>
              <Typography
                className="flex flex-1 text-14 md:text-20"
                onClick={socketTest}
                tabIndex={0}
                role="button"
                onKeyDown={handleKeyDown}
              >
                AUPLDRMLWORISFLDSWHGMHQUEQAAKZPKUXQYXUYLEGDWTCIYRACTHFPBIGRE{' '}
              </Typography>
              <Typography className="text-14 md:text-20">2027481518128 </Typography>
            </div>
          </Card>
        </div>
      }
      scroll="content"
    />
  );
}

export default withReducer('richlist', reducer)(RichlistPage);
