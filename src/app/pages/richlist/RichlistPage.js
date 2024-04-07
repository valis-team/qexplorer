import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { Typography } from '@mui/material';
import Card from 'src/app/components/Card/Card';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import RichlistHeader from './RichlistHeader';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function RichlistPage() {
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL);
    setTimeout(() => {
      newSocket.emit('livesocketRequest', 'help');
    }, 1000);

    newSocket.on('livesocketResponse', (data) => {
      console.log(data);
    });
  }, []);
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
              <Typography className="flex flex-1 text-14 md:text-20">
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

export default RichlistPage;
