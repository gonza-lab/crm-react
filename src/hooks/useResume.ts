import { useState } from 'react';
import ProductDB from '../interfaces/ProductDB';

interface UseResumeResponse {
  total: number;
  totalIva: number;
  iva: number;
}

const useResume = (products: ProductDB[]): UseResumeResponse => {
  const [total] = useState(
    products.reduce((acum, product) => acum + product.price, 0)
  );

  return { total, totalIva: total * 1.21, iva: total * 0.21 };
};

export default useResume;
