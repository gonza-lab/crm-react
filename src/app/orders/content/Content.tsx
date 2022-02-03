import { FunctionComponent } from 'react';

import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

import { useSelector } from 'react-redux';

import { RootState } from '../../../state/store';
import { OrderStatus } from '../../../state/orders/slice';
import OrdersList from '../list/List';
import { Link } from 'react-router-dom';

const Content = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<{ open?: boolean; drawerWidth: number }>(({ theme, open, drawerWidth }) => ({
  width: '100%',
  flexGrow: 1,
  zIndex: 1,
  [theme.breakpoints.up('md')]: {
    marginRight: `-${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  },
}));

const OrdersContent: FunctionComponent<{ drawerWidth: number }> = ({
  drawerWidth,
}) => {
  const isOpenDrawer = useSelector<RootState, boolean>(
    (state) => state.orders.drawer.isOpen
  );
  const status = useSelector<RootState, OrderStatus>(
    (state) => state.orders.status
  );

  return (
    <Content drawerWidth={drawerWidth} open={isOpenDrawer}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          mb: 3,
          pt: 8,
        }}
      >
        <Typography variant="h4">Pedidos</Typography>
        <Box>
          <Link to="/pedidos/nuevo">
            <Button variant="contained" startIcon={<AddIcon />}>
              Nuevo
            </Button>
          </Link>
        </Box>
      </Box>
      {status === OrderStatus.loadingOrders ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 10,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <OrdersList />
      )}
    </Content>
  );
};

export default OrdersContent;
