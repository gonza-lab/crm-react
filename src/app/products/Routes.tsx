import { Navigate, Route, Routes } from 'react-router-dom';
import ProductsIndex from '.';
import Products from './Products';

const ProductsRoutes = () => (
  <Routes>
    <Route path="/" element={<ProductsIndex />}>
      <Route index element={<Products />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  </Routes>
);

export default ProductsRoutes;
