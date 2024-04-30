import { Navigate } from 'react-router-dom';
import OrderbookPage from './OrderbookPage';
import OrderbookContent from './OrderbookContent';

const OrderbookConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'orderbook',
      element: <OrderbookPage />,
      children: [
        {
          path: '',
          element: <Navigate to="QX" />,
        },
        {
          path: ':token',
          element: <OrderbookContent />,
        },
      ],
    },
  ],
};

export default OrderbookConfig;
