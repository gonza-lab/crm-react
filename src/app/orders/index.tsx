import { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';

import { readAll } from '../../state/orders/slice';
import OrdersList from './list/List';

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
        py: 8,
      }}
    >
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
    </BoxRoot>
  );
};

export default Orders;
