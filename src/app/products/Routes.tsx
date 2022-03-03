import { Navigate, Route, Routes } from 'react-router-dom';
import ProductsIndex from '.';

const ProductsRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<ProductsIndex />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  </Routes>
);

export default ProductsRoutes;
