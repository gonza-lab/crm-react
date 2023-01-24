import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import ProductDB from '../../../interfaces/ProductDB';
import ProductItem from '../item/Item';

interface ProductsTableProps {
  products: ProductDB[];
  rowsPerPage: number;
}

const ProductsTable: FC<ProductsTableProps> = ({ products, rowsPerPage }) => {
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
          <ProductItem key={product.id} {...product} />
        ))}
      </TableBody>
      <TableRow
        sx={{
          height: (rowsPerPage - products.length) * 66.8,
        }}
      >
        <TableCell colSpan={6} padding="none" style={{ border: 'none' }} />
      </TableRow>
    </Table>
  );
};

export default ProductsTable;
