import { Box } from '@mui/material';

import OrdersDrawer from './drawer/Drawer';
import OrdersContent from './content/Content';

const drawerWidth = 500;

const Orders = () => {
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

export default Orders;
