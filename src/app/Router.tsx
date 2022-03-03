import { FunctionComponent, Suspense, lazy } from 'react';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../state/store';

import Page404 from './404';
import LoginIndex from './auth/login';

import OrdersRoutes from './orders/Routes';
const ProductsRoutes = lazy(() => import('./products/Routes'));
const InvoicesRoutes = lazy(() => import('./invoices/Routes'));
const SettingsRoutes = lazy(() => import('./settings/Routes'));

import { AuthState } from '../state/auth/slice';

import { Layout } from './shared/layout/components/Layout';

const RequireAuth: FunctionComponent = ({ children }) => {
  const { auth } = useSelector<RootState, AuthState>((state) => state.auth);
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="pedidos/*" element={<OrdersRoutes />} />
        <Route
          path="productos/*"
          element={
            <Suspense fallback={<>cargando</>}>
              <ProductsRoutes />
            </Suspense>
          }
        />
        <Route
          path="recibos/*"
          element={
            <Suspense fallback={<>cargando</>}>
              <InvoicesRoutes />
            </Suspense>
          }
        />
        <Route
          path="configuracion/*"
          element={
            <Suspense fallback={<>cargando</>}>
              <SettingsRoutes />
            </Suspense>
          }
        />
        <Route index element={<Navigate to="pedidos" />} />
      </Route>
      <Route
        path="login"
        element={
          <Suspense fallback={<>cargando</>}>
            <LoginIndex />
          </Suspense>
        }
      />
      <Route path="404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Router;
