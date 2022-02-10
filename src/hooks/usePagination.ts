import { ChangeEvent, useState } from 'react';
import { PaginatedRequest } from '../interfaces/PaginatedRequest';

const usePagination = (callback: (options: PaginatedRequest) => void) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRowsPerPage(+value);
    setPage(0);
    callback({ limit: +value, offset: 0 });
  };

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
    callback({ limit: rowsPerPage, offset: rowsPerPage * newPage });
  };

  return { handleChangeRowsPerPage, handleChangePage, page, rowsPerPage };
};

export default usePagination;
