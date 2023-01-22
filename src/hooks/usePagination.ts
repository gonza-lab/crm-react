import { ChangeEvent, useEffect, useState } from 'react';

const usePagination = (
  onRowsPerPageChange?: (newRowsPerPage: number) => void,
  onPageChange?: (newPage: number) => void,
  defaultRowsPerPage?: number,
  resetPage?: (callback: () => void) => void
) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage || 5);

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

  useEffect(() => {
    if (resetPage) resetPage(() => setPage(0));
  }, []);

  return { handleChangeRowsPerPage, handleChangePage, page, rowsPerPage };
};

export default usePagination;
