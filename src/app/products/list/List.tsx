import { FC, useEffect, useState } from 'react';
import { Box, Card } from '@mui/material';
import TableSearch from '../../shared/table-search/TableSearch';
import ProductsTable from '../table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts } from '../../../state/products/slice';
import { RootState } from '../../../state/store';
import ProductDB from '../../../interfaces/ProductDB';
import Pagination from '../../shared/pagination/Pagination';
import { readAllProducts } from '../../../state/products/reducer';

const ProductsList: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector<RootState, ProductDB[]>(selectAllProducts);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(readAllProducts({ limit: rowsPerPage, offset: 0 }));
  }, [rowsPerPage]);

  useEffect(() => {
    dispatch(
      readAllProducts({
        limit: rowsPerPage,
        offset: rowsPerPage * page,
      })
    );
  }, [page]);

  return (
    <Box sx={{ px: { xs: 2, md: 3 } }}>
      <Card
        sx={{
          overflowX: 'auto',
        }}
      >
        <TableSearch
          input={{ placeholder: 'Buscar producto por nombre' }}
          onSearch={(e) => console.log(e)}
        />
        <ProductsTable products={products} />
        <Pagination
          totalCount={50}
          onRowsPerPageChange={setRowsPerPage}
          onPageChange={setPage}
          defaultRowsPerPage={5}
        />
      </Card>
    </Box>
  );
};

export default ProductsList;
