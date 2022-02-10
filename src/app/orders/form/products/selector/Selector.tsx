import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Divider, InputBase, TableContainer } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import ProductDB from '../../../../../interfaces/ProductDB';
import {
  ProductStoreStatus,
  selectAllProducts,
} from '../../../../../state/products/slice';
import { RootState } from '../../../../../state/store';
import FormProductsSelectorTable from './table/Table';
import FormProductsSelectorPagination from './pagination/Pagination';
import useDebounce from '../../../../../hooks/useDebounce';
import { readAllProducts } from '../../../../../state/products/reducer';

const FormProductsSelector = () => {
  const dispatch = useDispatch();
  const products = useSelector<RootState, ProductDB[]>(selectAllProducts);
  const status = useSelector<RootState, ProductStoreStatus>(
    (state) => state.products.status
  );
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(readAllProducts({ limit: rowsPerPage, offset: 0, q: search }));
  }, [rowsPerPage]);

  useDebounce(
    () =>
      dispatch(
        readAllProducts({
          limit: rowsPerPage,
          offset: rowsPerPage * page,
          q: search,
        })
      ),
    [search]
  );

  useEffect(() => {
    dispatch(
      readAllProducts({
        limit: rowsPerPage,
        offset: rowsPerPage * page,
        q: search,
      })
    );
  }, [page]);

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
        <FormProductsSelectorTable
          products={products}
          rowsPerPage={rowsPerPage}
          loading={status === ProductStoreStatus.readingProducts}
        />
        <FormProductsSelectorPagination
          onRowsPerPageChange={setRowsPerPage}
          onPageChange={setPage}
          disableButtons={status === ProductStoreStatus.readingProducts}
        />
      </TableContainer>
    </Card>
  );
};

export default FormProductsSelector;
