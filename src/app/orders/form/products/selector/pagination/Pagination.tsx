import { TablePagination } from '@mui/material';
import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import usePagination from '../../../../../../hooks/usePagination';
import { PaginatedRequest } from '../../../../../../interfaces/PaginatedRequest';
import { readAllProducts } from '../../../../../../state/products/reducer';
import { ProductState } from '../../../../../../state/products/slice';
import { RootState } from '../../../../../../state/store';

const FormProductsSelectorPagination: FunctionComponent<{
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}> = ({ onRowsPerPageChange }) => {
  const dispatch = useDispatch();
  const { total_count } = useSelector<RootState, ProductState>(
    (state) => state.products
  );
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } =
    usePagination((options?: PaginatedRequest) => {
      dispatch(readAllProducts(options));
    });

  useEffect(() => onRowsPerPageChange(rowsPerPage), [rowsPerPage]);

  return (
    <TablePagination
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
