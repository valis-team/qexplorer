import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import Error404Config from '../pages/404/Error404Config';
import RichlistConfig from '../pages/richlist/RichlistConfig';
import ExplorerConfig from '../pages/explorer/ExplorerConfig';
import OrderbookConfig from '../pages/orderbook/OrderbookConfig';

const routeConfigs = [ExplorerConfig, RichlistConfig, OrderbookConfig, Error404Config];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/explorer" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
