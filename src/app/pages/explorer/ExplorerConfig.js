import ExplorerPage from './ExplorerPage';
import OverviewPage from './overview/OverviewPage';

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
          path: '',
          element: <OverviewPage />,
        },
      ],
    },
  ],
};

export default ExplorerConfig;
