import { Box, Container, Typography } from '@mui/material';

import FormCustomer from './customer/Customer';
import LinkBack from '../../shared/link-back/LinkBack';
import FormProducts from './products/Products';

const OrderForm = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <LinkBack>Ordenes</LinkBack>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Nueva orden</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FormCustomer />
        <FormProducts />
      </Box>
    </Container>
  );
};

export default OrderForm;
