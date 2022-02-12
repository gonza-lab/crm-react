import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Divider, TableContainer } from '@mui/material';

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
import FormProductsSearch from './search/Search';

const FormProductsSelector: FunctionComponent<{
  onAddProduct: (product: ProductDB) => void;
}> = ({ onAddProduct }) => {
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
      <FormProductsSearch
        searching={status === ProductStoreStatus.readingProducts}
        onSearch={(e) => setSearch(e.target.value)}
      />
      <Divider />
      <TableContainer sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormProductsSelectorTable
          onClickIcon={onAddProduct}
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
