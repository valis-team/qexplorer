import { Navigate } from 'react-router-dom';
import RichlistPage from './RichlistPage';
import RichlistContent from './RichlistContent';

const RichlistConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'richlist',
      element: <RichlistPage />,
      children: [
        {
          path: '',
          element: <Navigate to="QU" />,
        },
        {
          path: ':token',
          element: <RichlistContent />,
        },
      ],
    },
  ],
};

export default RichlistConfig;
