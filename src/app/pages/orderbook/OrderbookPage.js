import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import OrderbookHeader from './OrderbookHeader';
import reducer from './store';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function OrderbookPage() {
  return <Root header={<OrderbookHeader />} content={<Outlet />} scroll="content" />;
}

export default withReducer('orderbook', reducer)(OrderbookPage);
