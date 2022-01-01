import { FunctionComponent } from 'react';

import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux';

import OrderDB from '../../../interfaces/OrderDB';
import {
  closeOrdersDrawer,
  selectOrderById,
  StateDrawer as OrderStateDrawer,
} from '../../../state/orders/slice';

import { RootState } from '../../../state/store';

import Drawer from '../../shared/drawer/Drawer';

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const OrdersDrawer: FunctionComponent<{ drawerWidth: number }> = ({
  drawerWidth,
}) => {
  const dispatch = useDispatch();
  const drawer = useSelector<RootState, OrderStateDrawer>(
    (state) => state.orders.drawer
  );
  const order = useSelector<RootState, OrderDB | undefined>((state) =>
    selectOrderById(state, drawer.orderId)
  );

  const closeDrawer = () => {
    dispatch(closeOrdersDrawer());
  };

  return (
    <Drawer open={drawer.isOpen} drawerWidth={drawerWidth}>
      {order ? (
        <Header
          sx={{
            height: '68px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            color: '#fff',
          }}
        >
          <Typography variant="h6">Pedido #{order.id}</Typography>
          <IconButton onClick={closeDrawer} sx={{ color: 'inherit' }}>
            <CloseIcon />
          </IconButton>
        </Header>
      ) : (
        <></>
      )}
    </Drawer>
  );
};

export default OrdersDrawer;
