import { FC } from 'react';

import {
  Box,
  LinearProgress,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useSelector } from 'react-redux';

import ProductDB from '../../../interfaces/ProductDB';
import { RootState } from '../../../state/store';

import { selectProductById } from '../../../state/products/slice';

import toMoneyFormat from '../../../util/toMoneyFormat';

import Dropdown from '../../shared/dropdown/Dropdown';

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
        <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
          {product.name}
        </Typography>
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
      <TableCell>{toMoneyFormat(product.price)}</TableCell>
      <TableCell>Público</TableCell>
      <TableCell>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <IconButton size="small">
            <MoreHorizIcon />
          </IconButton> */}
          <Dropdown
            IconButtonProps={{
              size: 'small',
              children: <MoreHorizIcon />,
            }}
            MenuProps={{
              children: <div>En construcción</div>,
              open: false,
            }}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
