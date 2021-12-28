import { FunctionComponent } from 'react';

import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../state/store';

import App from './App';
import Page404 from './404';
import Orders from './orders';
import Login from './auth/login';

const RequireAuth: FunctionComponent = ({ children }) => {
  const user = useSelector<RootState>((state) => state.user.data);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const Router = () => {
  const element = useRoutes([
    {
      path: '/',
      element: (
        <RequireAuth>
          <App />
        </RequireAuth>
      ),
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
