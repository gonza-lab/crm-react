import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';

import FormCustomer from './customer/Customer';
import LinkBack from '../../shared/link-back/LinkBack';
import FormProducts, { OrderedProducts } from './products/Products';
import UserDB from '../../../interfaces/UserDB';

const OrderForm = () => {
  const [user, setUser] = useState<UserDB | null>();
  const [products, setProducts] = useState<OrderedProducts>({});

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <LinkBack>Ordenes</LinkBack>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Nueva orden</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FormCustomer onChangeUser={setUser} />
        <FormProducts onChangeProducts={setProducts} />
      </Box>
    </Container>
  );
};

export default OrderForm;
