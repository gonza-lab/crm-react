import {
  Box,
  LinearProgress,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import ProductDB from '../../../interfaces/ProductDB';
import { selectProductById } from '../../../state/products/slice';
import { RootState } from '../../../state/store';

interface ProductItemProps {
  id: number;
}

const ProductItem: FC<ProductItemProps> = ({ id }) => {
  const product = useSelector<RootState, ProductDB | undefined>((state) =>
    selectProductById(state, id)
  );

  if (!product) return <></>;

  return (
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
  );
};

export default ProductItem;
