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
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import ProductDB from '../../../../../../interfaces/ProductDB';
import toMoneyFormat from '../../../../../../util/toMoneyFormat';
import CenterAbsolute from '../../../../../shared/center-absolute/CenterAbsolute';

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
          <TableCell sx={{ width: 550 }}>Nombre</TableCell>
          <TableCell sx={{ width: 180 }}>Precio</TableCell>
          <TableCell>Stock</TableCell>
        </TableRow>
      </TableHead>
      <TableBody sx={{ position: 'relative' }}>
        {loading ? (
          <CenterAbsolute component="tr">
            <td>
              <CircularProgress />
            </td>
          </CenterAbsolute>
        ) : !products.length ? (
          <CenterAbsolute>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <SentimentVeryDissatisfiedIcon />
              <Typography variant="body2" color="textSecondary">
                Productos no encontrados
              </Typography>
            </Box>
          </CenterAbsolute>
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
