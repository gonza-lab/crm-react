import { useSelector } from 'react-redux';

import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import ProductDB from '../../../../../interfaces/ProductDB';
import { selectAllProducts } from '../../../../../state/products/slice';
import { RootState } from '../../../../../state/store';

const FormProductsSelector = () => {
  const products = useSelector<RootState, ProductDB[]>(selectAllProducts);

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 72 }}></TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <IconButton>
                  <AddShoppingCart />
                </IconButton>
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default FormProductsSelector;
