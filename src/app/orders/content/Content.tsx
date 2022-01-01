import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import OrdersList from '../list/List';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

const Content = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<{ open?: boolean; drawerWidth: number }>(({ theme, open, drawerWidth }) => ({
  flexGrow: 1,
  zIndex: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const OrdersContent: FunctionComponent<{ drawerWidth: number }> = ({
  drawerWidth,
}) => {
  const isOpenDrawer = useSelector<RootState, boolean>(
    (state) => state.orders.drawer.isOpen
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
          <Button variant="contained" startIcon={<AddIcon />}>
            Nuevo
          </Button>
        </Box>
      </Box>
      <OrdersList />
    </Content>
  );
};

export default OrdersContent;
