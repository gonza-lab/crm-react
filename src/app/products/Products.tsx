import { Box } from '@mui/material';

import HeaderButton from '../shared/header-button/HeaderButton';
import ProductsList from './list/List';

const ProductsIndex = () => {
  return (
    <Box component="main" sx={{ py: 8 }}>
      <HeaderButton
        title="Productos"
        button={{ href: '/productos/nuevo', text: 'Añadir', visible: false }}
      />
      <ProductsList />
    </Box>
  );
};

export default ProductsIndex;
