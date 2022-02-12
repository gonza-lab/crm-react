import { Grid } from '@mui/material';
import { useState } from 'react';
import ProductDB from '../../../../interfaces/ProductDB';
import FormProductsSummary from './resume/Resume';
import FormProductsSelector from './selector/Selector';

export interface OrderedProduct {
  quantity: number;
  product: ProductDB;
}
export interface OrderedProducts {
  [key: number]: OrderedProduct;
}

const isEnoughStock = (product: ProductDB, quantity: number): boolean => {
  return product.stock >= quantity;
};

const FormProducts = () => {
  const [products, setProducts] = useState<OrderedProducts>({});

  const handleAddProduct = (product: ProductDB) => {
    if (
      !products[product.id] ||
      isEnoughStock(product, products[product.id].quantity + 1)
    ) {
      setProducts((prev) => ({
        ...prev,
        [product.id]: {
          quantity: prev[product.id] ? prev[product.id].quantity + 1 : 1,
          product,
        },
      }));
    }
  };

  const handleChangeProduct = (
    product: ProductDB,
    orderedProduct: OrderedProduct
  ) => {
    if (isEnoughStock(product, orderedProduct.quantity)) {
      setProducts((prev) => ({
        ...prev,
        [product.id]: orderedProduct,
      }));
    }
  };

  const handleDeleteProduct = (product: ProductDB) => {
    setProducts((prev) => {
      const clone = { ...prev };
      delete clone[product.id];
      return clone;
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <FormProductsSelector onAddProduct={handleAddProduct} />
      </Grid>
      <Grid item xs={12} md={5}>
        <FormProductsSummary
          products={products}
          onChangeProduct={handleChangeProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </Grid>
    </Grid>
  );
};

export default FormProducts;
