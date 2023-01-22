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
          <ProductItem key={product.id} {...product} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
