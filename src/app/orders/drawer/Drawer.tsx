import { FunctionComponent } from 'react';

import { Box, IconButton, Typography, Divider, Button } from '@mui/material';
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
import OrderDrawerList from './list/List';
import OrderDrawerTable from './table/Table';
import { Link } from 'react-router-dom';

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
        <>
          <Header
            sx={{
              height: '68px',
              display: 'flex',
              flexShrink: 0,
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
          <Box sx={{ px: 3, py: 4 }}>
            <Typography variant="h6" sx={{ my: 3 }}>
              Detalles
            </Typography>
            <OrderDrawerList order={order} />
            <Divider />
            <Typography variant="h6" sx={{ my: 3 }}>
              Articulos
            </Typography>
            <OrderDrawerTable order={order} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Link to={['/recibos', order.id, 'detalle'].join('/')}>
                <Button variant="contained">Ver comprobante</Button>
              </Link>
            </Box>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Drawer>
  );
};

export default OrdersDrawer;
