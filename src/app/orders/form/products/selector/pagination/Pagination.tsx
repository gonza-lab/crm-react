import { TablePagination } from '@mui/material';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import usePagination from '../../../../../../hooks/usePagination';
import { ProductState } from '../../../../../../state/products/slice';
import { RootState } from '../../../../../../state/store';

const FormProductsSelectorPagination: FunctionComponent<{
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onPageChange: (newPage: number) => void;
  disableButtons?: boolean;
}> = ({ onRowsPerPageChange, onPageChange, disableButtons }) => {
  const { total_count } = useSelector<RootState, ProductState>(
    (state) => state.products
  );
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } =
    usePagination(onRowsPerPageChange, onPageChange);

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 20]}
      component="div"
      count={total_count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      backIconButtonProps={{ disabled: disableButtons || !page }}
      nextIconButtonProps={{
        disabled: disableButtons || total_count <= (page + 1) * rowsPerPage,
      }}
    />
  );
};

export default FormProductsSelectorPagination;
