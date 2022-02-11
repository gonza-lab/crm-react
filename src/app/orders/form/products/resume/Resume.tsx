import { FunctionComponent } from 'react';
import { Box, Card, Typography } from '@mui/material';
import ProductDB from '../../../../../interfaces/ProductDB';

import { OrderedProduct, OrderedProducts } from '../Products';
import FormProductsSummaryDetail from './product/Product';

const FormProductsSummary: FunctionComponent<{
  products: OrderedProducts;
  onChangeProduct: (product: ProductDB, orderedProduct: OrderedProduct) => void;
  onDeleteProduct: (product: ProductDB) => void;
}> = ({ products, onChangeProduct, onDeleteProduct }) => {
  const handleChangeQuantity = (product: ProductDB, newQuantity: number) => {
    onChangeProduct(product, { product, quantity: newQuantity });
  };

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Resumen
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {Object.values(products).map((value) => (
          <FormProductsSummaryDetail
            {...value}
            key={value.product.id}
            onChangeValue={handleChangeQuantity}
            onDelete={onDeleteProduct}
          />
        ))}
      </Box>
    </Card>
  );
};

export default FormProductsSummary;
