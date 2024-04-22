import ExplorerPage from './ExplorerPage';
import OverviewPage from './overview/OverviewPage';
import TickPage from './tick/TickPage';
import AddressPage from './address/AddressPage';
import TransactionPage from './transaction/TransactionPage';

const ExplorerConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'explorer',
      element: <ExplorerPage />,
      children: [
        {
          path: 'tick/:tick',
          element: <TickPage />,
        },
        {
          path: 'address/:address',
          element: <AddressPage />,
        },
        {
          path: 'tx/:tx',
          element: <TransactionPage />,
        },
        {
          path: '',
          element: <OverviewPage />,
        },
      ],
    },
  ],
};

export default ExplorerConfig;
