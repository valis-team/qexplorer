import ExplorerPage from './ExplorerPage';
import OverviewPage from './overview/OverviewPage';
import TickPage from './tick/TickPage';

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
          path: '',
          element: <OverviewPage />,
        },
      ],
    },
  ],
};

export default ExplorerConfig;
