import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { readAll } from '../../state/orders/slice';

const Invoices = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAll());
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        px: 3,
        py: 8,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { md: 'space-between' },
          alignItems: { md: 'center' },
        }}
      >
        <Typography sx={{ mb: 3 }} variant="h4">
          Recibos
        </Typography>
        <Box>
          <Button variant="contained" startIcon={<AddIcon />}>
            Nuevo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Invoices;
