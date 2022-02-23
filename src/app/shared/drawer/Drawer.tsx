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
        width: { xs: '100%', md: drawerWidth },
        maxWidth: drawerWidth,
        flexShrink: 0,
        position: { xs: 'absolute', md: 'sticky' },
        top: { md: '0px' },
        height: 'calc(100vh - 64px)',
        '& .MuiDrawer-paper': {
          width: '100%',
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      PaperProps={{
        sx: {
          position: { md: 'relative' },
          borderLeft: { xs: 'none', md: '1px solid #E6E8F0' },
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        },
      }}
      anchor="right"
      open={open}
    >
      {children}
    </DrawerMui>
  );
};

export default Drawer;
