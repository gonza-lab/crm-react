import { TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import usePagination from '../../../../../../hooks/usePagination';
import { PaginatedRequest } from '../../../../../../interfaces/PaginatedRequest';
import ProductDB from '../../../../../../interfaces/ProductDB';
import { readAllProducts } from '../../../../../../state/products/reducer';
import {
  ProductState,
  selectAllProducts,
} from '../../../../../../state/products/slice';
import { RootState } from '../../../../../../state/store';

const FormProductsSelectorPagination = () => {
  const { total_count } = useSelector<RootState, ProductState>(
    (state) => state.products
  );
  const products = useSelector<RootState, ProductDB[]>(selectAllProducts);
  const dispatch = useDispatch();
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } =
    usePagination((options?: PaginatedRequest) => {
      dispatch(readAllProducts(options));
    });

  return (
    <TablePagination
      sx={{
        height: (rowsPerPage - products.length) * 73 + 52,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
      rowsPerPageOptions={[5, 10, 20]}
      component="div"
      count={total_count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default FormProductsSelectorPagination;
