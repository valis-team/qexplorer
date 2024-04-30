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
          path: ':token',
          element: <OrderbookContent />,
        },
      ],
    },
  ],
};

export default OrderbookConfig;
