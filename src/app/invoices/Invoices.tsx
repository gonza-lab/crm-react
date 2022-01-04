import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import InvoiceList from './list/List';

const Invoices = () => {
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
      <InvoiceList />
    </Box>
  );
};

export default Invoices;
