import { Navigate, useRoutes } from 'react-router-dom';

import App from './App';
import Page404 from './404';
import Orders from './orders';
import Login from './auth/login';

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
          element: <Navigate to="/orders" />,
          index: true,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return element;
};

export default Router;
