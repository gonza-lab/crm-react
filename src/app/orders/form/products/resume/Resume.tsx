import { FunctionComponent } from 'react';
import { Box, Card, Typography } from '@mui/material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

import ProductDB from '../../../../../interfaces/ProductDB';
import { OrderedProduct, OrderedProducts } from '../Products';
import FormProductsSummaryDetail from './product/Product';
import CenterAbsolute from '../../../../shared/center-absolute/CenterAbsolute';

const FormProductsSummary: FunctionComponent<{
  products: OrderedProducts;
  onChangeProduct: (product: ProductDB, orderedProduct: OrderedProduct) => void;
  onDeleteProduct: (product: ProductDB) => void;
}> = ({ products, onChangeProduct, onDeleteProduct }) => {
  const handleChangeQuantity = (product: ProductDB, newQuantity: number) => {
    onChangeProduct(product, { product, quantity: newQuantity });
  };

  return (
    <Card sx={{ p: 3, height: '100%', position: 'relative' }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Resumen
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {Object.values(products).length ? (
          Object.values(products).map((value) => (
            <FormProductsSummaryDetail
              {...value}
              key={value.product.id}
              onChangeValue={handleChangeQuantity}
              onDelete={onDeleteProduct}
            />
          ))
        ) : (
          <CenterAbsolute>
            <Box>
              <ProductionQuantityLimitsIcon
                sx={{ margin: '0 auto', display: 'block' }}
              />
              <Typography variant="body2" color="textSecondary" mt={2}>
                No hay productos seleccionados
              </Typography>
            </Box>
          </CenterAbsolute>
        )}
      </Box>
    </Card>
  );
};

export default FormProductsSummary;
