import { Navigate, Route, Routes } from 'react-router-dom';
import OrdersIndex from '.';
import OrderAddIndex from './add';

const OrdersRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<OrdersIndex />} />
      <Route path="nuevo" element={<OrderAddIndex />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  </Routes>
);

export default OrdersRoutes;
