import { ChangeEvent, useState } from 'react';

const usePagination = (
  onRowsPerPageChange?: (newRowsPerPage: number) => void,
  onPageChange?: (newPage: number) => void
) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRowsPerPage(+value);
    setPage(0);
    if (onRowsPerPageChange) onRowsPerPageChange(+value);
  };

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  return { handleChangeRowsPerPage, handleChangePage, page, rowsPerPage };
};

export default usePagination;
