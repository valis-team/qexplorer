import RichlistPage from './RichlistPage';

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
          element: <RichlistPage />,
        },
        {
          path: ':token',
          element: <RichlistPage />,
        },
      ],
    },
  ],
};

export default RichlistConfig;
