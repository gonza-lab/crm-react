import { AddShoppingCart } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
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
  rowsPerPage: number;
  loading?: boolean;
}> = ({ products, rowsPerPage, loading }) => {
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
      <TableBody sx={{ position: 'relative' }}>
        {loading ? (
          <Box
            component="tr"
            sx={{
              right: '50%',
              top: '50%',
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <td>
              <CircularProgress />
            </td>
          </Box>
        ) : (
          products.map((product) => (
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
          ))
        )}
        {(rowsPerPage - products.length > 0 || loading) && (
          <TableRow
            style={{
              height:
                (loading ? rowsPerPage : rowsPerPage - products.length) * 73,
            }}
          >
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default FormProductsSelectorTable;
