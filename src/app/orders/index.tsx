import { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';

import { readAll } from '../../state/orders/slice';
import OrdersList from './list/List';
import OrdersDrawer from './drawer/Drawer';
import OrdersContent from './content/Content';
import { RootState } from '../../state/store';

const drawerWidth = 500;

const BoxRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Orders = () => {
  const dispatch = useDispatch();
  const isOpenDrawer = useSelector<RootState, boolean>(
    (state) => state.orders.isOpenDrawer
  );

  useEffect(() => {
    dispatch(readAll());
  }, []);

  return (
    <BoxRoot
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        display: 'flex',
      }}
    >
      <OrdersContent drawerWidth={drawerWidth} open={isOpenDrawer}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            mb: 3,
          }}
        >
          <Typography variant="h4">Pedidos</Typography>
          <Box>
            <Button variant="contained" startIcon={<AddIcon />}>
              Nuevo
            </Button>
          </Box>
        </Box>
        <OrdersList />
      </OrdersContent>
      <OrdersDrawer open={isOpenDrawer} drawerWidth={drawerWidth}>
        Jejox el drawer
      </OrdersDrawer>
    </BoxRoot>
  );
};

export default Orders;
