import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FunctionComponent } from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AddIcon from '@mui/icons-material/Add';

import ProductDB from '../../../../../../interfaces/ProductDB';
import toMoneyFormat from '../../../../../../util/toMoneyFormat';
import CenterAbsolute from '../../../../../shared/center-absolute/CenterAbsolute';

const FormProductsSelectorTable: FunctionComponent<{
  products: ProductDB[];
  rowsPerPage: number;
  loading?: boolean;
  onClickIcon?: (product: ProductDB) => void;
}> = ({ products, rowsPerPage, loading, onClickIcon }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell sx={{ width: 550 }}>Nombre</TableCell>
          <TableCell sx={{ width: 180 }}>Precio</TableCell>
          <TableCell>Stock</TableCell>
        </TableRow>
      </TableHead>
      <TableBody sx={{ position: 'relative' }}>
        {!products.length ? (
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
            <TableRow key={product.id} style={{ height: 57 }}>
              <TableCell padding="none" sx={{ p: 1 }}>
                <IconButton onClick={() => onClickIcon && onClickIcon(product)}>
                  <AddIcon sx={{ color: 'text.primary' }} />
                </IconButton>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  style={{
                    whiteSpace: 'nowrap',
                    maxWidth: 550,
                  }}
                >
                  {product.name}
                </Typography>
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
        <TableRow
          sx={{
            height: (rowsPerPage - products.length) * 57,
          }}
        >
          <TableCell colSpan={6} padding="none" style={{ border: 'none' }} />
        </TableRow>
        {loading && (
          <Paper
            sx={{
              boxShadow: 'none',
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <CenterAbsolute component="div">
              <CircularProgress />
            </CenterAbsolute>
          </Paper>
        )}
      </TableBody>
    </Table>
  );
};

export default FormProductsSelectorTable;
