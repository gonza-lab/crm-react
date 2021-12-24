import { useRoutes } from 'react-router-dom';
import App from '../App';
import Page404 from './404/Page404';
import Orders from './orders';

const Router = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: 'orders',
          element: <Orders />,
        },
        {
          element: <Orders />,
          index: true,
        },
      ],
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return element;
};

export default Router;
