import { Box, Grid, InputLabel } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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

const showWarningProduct = (product: ProductDB) => {
  toast(
    <div>
      No hay suficiente stock de: <br /> <b>{product.name}</b>
    </div>,
    {
      icon: '⚠️',
      id: 'warning-products',
    }
  );
};

const FormProducts: FunctionComponent<{
  onChangeProducts: (products: OrderedProducts) => void;
  error?: string | boolean;
}> = ({ onChangeProducts, error }) => {
  const [products, setProducts] = useState<OrderedProducts>({});

  const handleAddProduct = (product: ProductDB) => {
    if (
      product.stock >= 1 &&
      (!products[product.id] ||
        isEnoughStock(product, products[product.id].quantity + 1))
    ) {
      setProducts((prev) => ({
        ...prev,
        [product.id]: {
          quantity: prev[product.id] ? prev[product.id].quantity + 1 : 1,
          product,
        },
      }));
    } else {
      showWarningProduct(product);
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
    } else {
      showWarningProduct(product);
    }
  };

  const handleDeleteProduct = (product: ProductDB) => {
    setProducts((prev) => {
      const clone = { ...prev };
      delete clone[product.id];
      return clone;
    });
  };

  useEffect(() => onChangeProducts(products), [products]);

  return (
    <Box>
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
      {error && (
        <InputLabel error sx={{ mt: 1 }}>
          {error}
        </InputLabel>
      )}
    </Box>
  );
};

export default FormProducts;
