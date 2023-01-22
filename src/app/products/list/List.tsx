import { FC, useEffect, useState } from 'react';

import { Box, Card } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import ProductDB from '../../../interfaces/ProductDB';

import useDebounce from '../../../hooks/useDebounce';

import { RootState } from '../../../state/store';
import { readAllProducts } from '../../../state/products/reducer';
import {
  ProductStoreStatus,
  selectAllProducts,
  ProductState,
} from '../../../state/products/slice';

import TableSearch from '../../shared/table-search/TableSearch';
import Pagination from '../../shared/pagination/Pagination';

import ProductsTable from '../table/Table';

const defaultRowsPerPage = 5;

let resetPage: () => void;

const ProductsList: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector<RootState, ProductDB[]>(selectAllProducts);
  const { status, total_count } = useSelector<RootState, ProductState>(
    (state) => state.products
  );
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [writing, setWriting] = useState(false);

  useEffect(() => {
    dispatch(readAllProducts({ limit: rowsPerPage, offset: 0, q: search }));
  }, [rowsPerPage]);

  useEffect(() => {
    dispatch(
      readAllProducts({
        limit: rowsPerPage,
        offset: rowsPerPage * page,
        q: search,
      })
    );
  }, [page]);

  useDebounce(() => {
    setWriting(false);
    resetPage();
    dispatch(
      readAllProducts({
        limit: rowsPerPage,
        q: search,
      })
    );
  }, [search]);

  return (
    <Box sx={{ px: { xs: 2, md: 3 } }}>
      <Card
        sx={{
          overflowX: 'auto',
        }}
      >
        <TableSearch
          input={{ placeholder: 'Buscar producto por nombre' }}
          searching={status === ProductStoreStatus.readingProducts || writing}
          onSearch={(e) => {
            setWriting(true);
            setSearch(e.target.value);
          }}
        />
        <ProductsTable products={products} rowsPerPage={rowsPerPage} />
        <Pagination
          totalCount={total_count}
          onRowsPerPageChange={setRowsPerPage}
          onPageChange={setPage}
          defaultRowsPerPage={defaultRowsPerPage}
          disableButtons={status === ProductStoreStatus.readingProducts}
          resetPage={(callback) => {
            resetPage = callback;
          }}
        />
      </Card>
    </Box>
  );
};

export default ProductsList;
