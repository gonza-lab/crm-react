import { FunctionComponent } from 'react';

import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../state/store';

import Page404 from './404';
import Invoices from './invoices/Invoices';
import Login from './auth/login';

import { Layout } from './shared/layout/components/Layout';
import settingsRoutes from './settings/Routes';
import { UserState } from '../state/user/slice';
import Orders from './orders';
import InvoiceDetail from './invoices/detail/Detail';
import InvoiceIndex from './invoices';

const RequireAuth: FunctionComponent = ({ children }) => {
  const { auth } = useSelector<RootState, UserState>((state) => state.user);
  const location = useLocation();

  if (!auth) {
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
          <Layout />
        </RequireAuth>
      ),
      children: [
        {
          path: 'pedidos',
          element: <Orders />,
        },
        {
          path: 'recibos',
          element: <InvoiceIndex />,
          children: [
            {
              index: true,
              element: <Invoices />,
            },
            {
              path: ':id',
              element: <InvoiceDetail />,
            },
          ],
        },
        {
          element: <Navigate to="/pedidos" />,
          index: true,
        },
        settingsRoutes,
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
