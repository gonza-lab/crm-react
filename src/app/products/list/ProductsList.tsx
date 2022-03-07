import { FC } from 'react';
import { Box, Card } from '@mui/material';
import TableSearch from '../../shared/table-search/TableSearch';
import ProductsTable from '../table/Table';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../../state/products/slice';
import { RootState } from '../../../state/store';
import ProductDB from '../../../interfaces/ProductDB';

const ProductsList: FC = () => {
  const products = useSelector<RootState, ProductDB[]>(selectAllProducts);

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
      </Card>
    </Box>
  );
};

export default ProductsList;
