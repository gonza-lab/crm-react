import { useState } from 'react';
import ProductOrder from '../interfaces/ProductOrder';

interface UseResumeResponse {
  total: number;
  totalIva: number;
  iva: number;
}

const useResume = (products: ProductOrder[]): UseResumeResponse => {
  const [total] = useState(
    products.reduce(
      (acum, product) => acum + product.quantity * product.product.price,
      0
    )
  );

  return { total, totalIva: total * 1.21, iva: total * 0.21 };
};

export default useResume;
