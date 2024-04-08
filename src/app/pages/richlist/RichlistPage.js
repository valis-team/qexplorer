import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { Typography } from '@mui/material';
import Card from 'src/app/components/Card/Card';
import { useEffect } from 'react';
import { useSocket } from 'src/app/context/SocketContext';
import RichlistHeader from './RichlistHeader';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function RichlistPage() {
  const socket = useSocket();
  useEffect(() => {
    setTimeout(() => {
      socket?.emit('livesocketRequest', 'help');
    }, 1000);

    socket?.on('livesocketResponse', (data) => {
      console.log(data);
    });
  }, [socket]);
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
