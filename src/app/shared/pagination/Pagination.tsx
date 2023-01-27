import { TablePagination } from '@mui/material';
import { FunctionComponent } from 'react';

import usePagination from '../../../hooks/usePagination';

const Pagination: FunctionComponent<{
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onPageChange: (newPage: number) => void;
  disableButtons?: boolean;
  totalCount: number;
  defaultRowsPerPage?: number;
  resetPage?: (callback: () => void) => void;
}> = ({
  onRowsPerPageChange,
  onPageChange,
  disableButtons,
  totalCount,
  defaultRowsPerPage,
  resetPage,
}) => {
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } =
    usePagination(
      onRowsPerPageChange,
      onPageChange,
      defaultRowsPerPage,
      resetPage
    );

  return (
    <TablePagination
      style={{ overflow: 'visible' }}
      labelRowsPerPage="Filas por página"
      rowsPerPageOptions={[5, 10, 20]}
      component="div"
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      backIconButtonProps={{ disabled: disableButtons || !page }}
      nextIconButtonProps={{
        disabled: disableButtons || totalCount <= (page + 1) * rowsPerPage,
      }}
    />
  );
};

export default Pagination;
