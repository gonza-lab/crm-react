import { FunctionComponent, useCallback } from 'react';

import {
  Box,
  Chip,
  TableCell,
  TableRow as MuiTableRow,
  Typography,
} from '@mui/material';
import { styled /* useTheme */ } from '@mui/material/styles';

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

const OrderListItem: FunctionComponent<{ id: EntityId }> = ({ id }) => {
  const dispatch = useDispatch();
  const order = useSelector<RootState, OrderDB | undefined>((state) =>
    selectOrderById(state, id)
  );

  const toggleDrawer = useCallback(() => {
    dispatch(openOrdersDrawer(id));
  }, []);
  //ESTO ES PARA SABER SI ESTOY EN MOBILE O NO
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down('md'));

  if (!order) return <></>;

  return (
    <TableRow onClick={toggleDrawer}>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BoxGray sx={{ p: 1, textAlign: 'center', ml: { md: 2 } }}>
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
            <Typography variant="subtitle2">Pedido #{order.id}</Typography>
            <Typography variant="body2">
              Total de
              {' ' +
                toMoneyFormat(
                  order.product.reduce(
                    (acum, product) => acum + product.price,
                    0
                  )
                )}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      {order?.user && (
        <TableCell>
          <Typography variant="subtitle2">Por</Typography>
          <Typography variant="body2">
            {order.user.first_name} {order.user?.last_name}
          </Typography>
        </TableCell>
      )}
      <TableCell sx={{ textAlign: 'right', pl: { xs: 0, md: 2 } }}>
        <Chip
          size="small"
          label={order.status.name}
          color={OrderStatusColor[order.status.name]}
        />
      </TableCell>
    </TableRow>
  );
};

export default OrderListItem;
