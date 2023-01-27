import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Divider, TableContainer } from '@mui/material';

import ProductDB from '../../../../../interfaces/ProductDB';
import {
  ProductState,
  ProductStoreStatus,
  selectAllProducts,
} from '../../../../../state/products/slice';
import { RootState } from '../../../../../state/store';
import FormProductsSelectorTable from './table/Table';
import useDebounce from '../../../../../hooks/useDebounce';
import { readAllProducts } from '../../../../../state/products/reducer';
import FormProductsSearch from './search/Search';
import Pagination from '../../../../shared/pagination/Pagination';

const FormProductsSelector: FunctionComponent<{
  onAddProduct: (product: ProductDB) => void;
}> = ({ onAddProduct }) => {
  const dispatch = useDispatch();
  const products = useSelector<RootState, ProductDB[]>(selectAllProducts);
  const { total_count, status } = useSelector<RootState, ProductState>(
    (state) => state.products
  );
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [writing, setWriting] = useState(false);

  useEffect(() => {
    dispatch(readAllProducts({ limit: rowsPerPage, offset: 0, q: search }));
  }, [rowsPerPage]);

  useDebounce(() => {
    setWriting(false);
    dispatch(
      readAllProducts({
        limit: rowsPerPage,
        q: search,
      })
    );
  }, [search]);

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
      <FormProductsSearch
        searching={status === ProductStoreStatus.readingProducts || writing}
        onSearch={(e) => {
          setSearch(e.target.value);
          setWriting(true);
        }}
      />
      <Divider />
      <TableContainer sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormProductsSelectorTable
          onClickIcon={onAddProduct}
          products={products}
          rowsPerPage={rowsPerPage}
          loading={status === ProductStoreStatus.readingProducts}
        />
        <Pagination
          onRowsPerPageChange={setRowsPerPage}
          onPageChange={setPage}
          disableButtons={status === ProductStoreStatus.readingProducts}
          totalCount={total_count}
        />
      </TableContainer>
    </Card>
  );
};

export default FormProductsSelector;
