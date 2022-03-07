import { FC } from 'react';
import {
  Box,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ProductDB from '../../../interfaces/ProductDB';

interface ProductsTableProps {
  products: ProductDB[];
}

const ProductsTable: FC<ProductsTableProps> = ({ products }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Stock</TableCell>
          <TableCell>Precio</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell sx={{ width: 100 }}>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow hover key={product.id}>
            <TableCell>
              <Typography variant="subtitle2">{product.name}</Typography>
            </TableCell>
            <TableCell>
              <Box>
                <LinearProgress
                  variant="determinate"
                  value={product.stock}
                  color={product.stock > 30 ? 'success' : 'error'}
                  sx={{ width: 36, height: 8, borderRadius: 3 }}
                />
                <Typography variant="body2" color="textSecondary">
                  {product.stock} en stock
                </Typography>
              </Box>
            </TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>Público</TableCell>
            <TableCell>boton</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
