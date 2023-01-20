import { useEffect } from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useDispatch } from 'react-redux';

import OrdersDrawer from './drawer/Drawer';
import OrdersContent from './content/Content';
import { readAllOrders } from '../../state/orders/reducer';
import { closeOrdersDrawer } from '../../state/orders/slice';

const drawerWidth = 500;

const BoxRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const OrdersIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllOrders({ limit: 5 }));

    return () => {
      dispatch(closeOrdersDrawer());
    };
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        display: 'flex',
      }}
    >
      <OrdersContent drawerWidth={drawerWidth} />
      <OrdersDrawer drawerWidth={drawerWidth} />
    </Box>
  );
};

export default OrdersIndex;
