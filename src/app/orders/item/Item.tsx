import { FunctionComponent } from 'react';

import {
  Box,
  Chip,
  TableCell,
  TableRow as MuiTableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import OrderDB from '../../../interfaces/OrderDB';
import OrderStatusColor from '../../../enums/OrderStatusColor';

import { selectOrderById } from '../../../state/orders/slice';
import { RootState } from '../../../state/store';

const TableRow = styled(MuiTableRow)(({ theme }) => ({
  cursor: 'pointer',
  '> td': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  ':hover': {
    backgroundColor: `${theme.palette.neutral[700]}0a`,
  },
  ':first-of-type': {
    '> td': {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const BoxGray = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral[200],
  maxWidth: 'fit-content',
  borderRadius: '16px',
}));

const OrderListItem: FunctionComponent<{ id: string | number }> = ({ id }) => {
  const order = useSelector<RootState, OrderDB | undefined>((state) =>
    selectOrderById(state, id)
  );

  if (!order) return <></>;

  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <BoxGray sx={{ p: 1, textAlign: 'center', marginLeft: 2 }}>
          <Typography variant="subtitle2">
            {format(new Date(order.updatedAt), 'MMM', {
              locale: es,
            }).toLocaleUpperCase()}
          </Typography>
          <Typography variant="h6">
            {new Date(order.updatedAt).getUTCDate()}
          </Typography>
        </BoxGray>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6">Pedido #{id}</Typography>
          <Typography variant="body2">
            Total de $
            {order.product.reduce((acum, product) => acum + product.price, 0)}
          </Typography>
        </Box>
      </TableCell>
      <TableCell sx={{ textAlign: 'right' }}>
        <Chip
          label={order.status.name}
          color={OrderStatusColor[order.status.name]}
        />
      </TableCell>
    </TableRow>
  );
};

export default OrderListItem;
