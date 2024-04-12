import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useSocket } from 'src/app/context/SocketContext';
import withReducer from 'app/store/withReducer';
import RichlistHeader from './RichlistHeader';
import reducer from './store';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function RichlistPage() {
  const navigate = useNavigate();
  const socket = useSocket();
  const { token } = useParams();
  const { richlist, tokens, marketcap, isConnected } = useSocket();
  const socketTest = (event) => {
    console.log(socket);
    if (socket && isConnected) socket.sendMessage('help');
  };

  return <Root header={<RichlistHeader />} content={<Outlet />} scroll="content" />;
}

export default withReducer('richlist', reducer)(RichlistPage);
