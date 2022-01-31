import { FunctionComponent, useCallback } from 'react';

import {
  Box,
  Checkbox,
  Chip,
  TableCell,
  TableRow as MuiTableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import OrderDB from '../../../interfaces/OrderDB';
import OrderStatusColor from '../../../enums/OrderStatusColor';

import { openOrdersDrawer, selectOrderById } from '../../../state/orders/slice';
import { RootState } from '../../../state/store';
import toMoneyFormat from '../../../util/toMoneyFormat';

const TableRow = styled(MuiTableRow)(({ theme }) => ({
  cursor: 'pointer',
  '> td': {
    maxHeight: '95px',
    borderBottom: `1px solid ${theme.palette.divider}`,
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

const OrderListItem: FunctionComponent<{
  id: EntityId;
  onToggle: (id: EntityId) => void;
  checked?: boolean;
}> = ({ id, onToggle, checked }) => {
  const order = useSelector<RootState, OrderDB | undefined>((state) =>
    selectOrderById(state, id)
  );
  if (!order) return <></>;

  const dispatch = useDispatch();
  const toggleDrawer = useCallback(() => {
    dispatch(openOrdersDrawer(id));
  }, []);

  return (
    <TableRow hover>
      <TableCell width={50}>
        <Checkbox checked={checked} onChange={() => onToggle(id)} />
      </TableCell>

      <TableCell onClick={toggleDrawer}>
        <Typography variant="body2">#{order.id}</Typography>
      </TableCell>
      <TableCell onClick={toggleDrawer}>
        <Typography variant="body2">
          {toMoneyFormat(
            order.products.reduce((acum, product) => acum + product.price, 0)
          )}
        </Typography>
      </TableCell>
      {order?.user && (
        <TableCell onClick={toggleDrawer}>
          <Typography variant="body2">
            {order.user.first_name} {order.user?.last_name}
          </Typography>
        </TableCell>
      )}
      <TableCell onClick={toggleDrawer} sx={{ pl: { xs: 0, md: 2 } }}>
        <Chip
          size="small"
          label={order.status.name}
          color={OrderStatusColor[order.status.name]}
        />
      </TableCell>
      <TableCell width={80} onClick={toggleDrawer}>
        <BoxGray sx={{ p: 1, textAlign: 'center', m: '0 auto' }}>
          <Typography variant="subtitle2">
            {format(new Date(order.updated_at), 'MMM', {
              locale: es,
            }).toLocaleUpperCase()}
          </Typography>
          <Typography variant="h6">
            {new Date(order.updated_at).getUTCDate()}
          </Typography>
        </BoxGray>
      </TableCell>
    </TableRow>
  );
};

export default OrderListItem;
