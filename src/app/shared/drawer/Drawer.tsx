import { Drawer as DrawerMui } from '@mui/material';
import { FunctionComponent } from 'react';

const Drawer: FunctionComponent<{ open?: boolean; drawerWidth: number }> = ({
  children,
  open,
  drawerWidth,
}) => {
  return (
    <DrawerMui
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
    </DrawerMui>
  );
};

export default Drawer;
