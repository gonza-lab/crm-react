import { Box, Container, Typography } from '@mui/material';

import FormCustomer from './customer/Customer';
import LinkBack from '../../shared/link-back/LinkBack';

const OrderForm = () => {
  return (
    <Container maxWidth="md" sx={{ pt: 8 }}>
      <Box sx={{ mb: 4 }}>
        <LinkBack>Ordenes</LinkBack>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Nueva orden</Typography>
      </Box>
      <FormCustomer />
    </Container>
  );
};

export default OrderForm;
