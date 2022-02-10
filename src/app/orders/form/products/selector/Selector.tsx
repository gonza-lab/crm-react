import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, Divider, InputBase, TableContainer } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import ProductDB from '../../../../../interfaces/ProductDB';
import { selectAllProducts } from '../../../../../state/products/slice';
import { RootState } from '../../../../../state/store';
import FormProductsSelectorTable from './table/Table';
import FormProductsSelectorPagination from './pagination/Pagination';

const FormProductsSelector = () => {
  const products = useSelector<RootState, ProductDB[]>(selectAllProducts);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <Card>
      <Box p={2} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <SearchIcon />
        <InputBase
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar producto por nombre"
        />
      </Box>
      <Divider />
      <TableContainer sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormProductsSelectorTable products={products} />
        <FormProductsSelectorPagination />
      </TableContainer>
    </Card>
  );
};

export default FormProductsSelector;
