import { Navigate, Route, Routes } from 'react-router-dom';
import InvoiceIndex from '.';
import InvoiceDetail from './detail/Detail';
import Invoices from './Invoices';

const InvoicesRoutes = () => (
  <Routes>
    <Route path="/" element={<InvoiceIndex />}>
      <Route index element={<Invoices />} />
      <Route path=":id/detalle" element={<InvoiceDetail />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  </Routes>
);

export default InvoicesRoutes;
