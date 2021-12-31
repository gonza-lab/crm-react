import { Drawer } from '@mui/material';
import { FunctionComponent } from 'react';

const OrdersDrawer: FunctionComponent<{ open?: boolean; drawerWidth: number }> =
  ({ children, open, drawerWidth }) => {
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        {children}
      </Drawer>
    );
  };

export default OrdersDrawer;
