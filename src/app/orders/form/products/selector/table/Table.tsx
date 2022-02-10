import { AddShoppingCart } from '@mui/icons-material';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FunctionComponent } from 'react';
import ProductDB from '../../../../../../interfaces/ProductDB';

import toMoneyFormat from '../../../../../../util/toMoneyFormat';

const FormProductsSelectorTable: FunctionComponent<{
  products: ProductDB[];
}> = ({ products }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ width: 72 }}></TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Stock</TableCell>
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
            <TableCell>
              <Typography variant="subtitle2">{product.name}</Typography>
            </TableCell>
            <TableCell>{toMoneyFormat(product.price)}</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {product.stock}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FormProductsSelectorTable;
