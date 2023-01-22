import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';

import { readAllProducts } from '../../state/products/reducer';
import HeaderButton from '../shared/header-button/HeaderButton';
import ProductsList from './list/List';

const ProductsIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllProducts({ limit: 10, offset: 0 }));
  }, []);

  return (
    <Box component="main" sx={{ pt: 8 }}>
      <HeaderButton
        title="Productos"
        button={{ href: '/productos/nuevo', text: 'Añadir' }}
      />
      <ProductsList />
    </Box>
  );
};

export default ProductsIndex;
