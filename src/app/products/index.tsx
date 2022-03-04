import { Box } from '@mui/material';
import HeaderButton from '../shared/header-button/HeaderButton';

const ProductsIndex = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeaderButton
        title="Productos"
        button={{ href: '/productos/nuevo', text: 'Añadir' }}
      />
    </Box>
  );
};

export default ProductsIndex;
