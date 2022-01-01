import { useEffect } from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useDispatch } from 'react-redux';

import { readAll } from '../../state/orders/slice';

import OrdersDrawer from './drawer/Drawer';
import OrdersContent from './content/Content';

const drawerWidth = 500;

const BoxRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAll());
  }, []);

  return (
    <BoxRoot
      component="main"
      sx={{
        flexGrow: 1,
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <OrdersContent drawerWidth={drawerWidth} />
      <OrdersDrawer drawerWidth={drawerWidth} />
    </BoxRoot>
  );
};

export default Orders;
