import { FunctionComponent, useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';

import FormCustomer from './customer/Customer';
import LinkBack from '../../shared/link-back/LinkBack';
import FormProducts, { OrderedProducts } from './products/Products';
import UserDB from '../../../interfaces/UserDB';
import OrderDB from '../../../interfaces/OrderDB';

export interface OrderFormOrder {
  user: UserDB;
  products: OrderedProducts;
}

const OrderForm: FunctionComponent<{
  initOrder?: OrderDB;
  loading?: boolean;
  title: JSX.Element;
  button: {
    text: string;
    onSubmit: (order: OrderFormOrder) => void;
  };
}> = ({ initOrder, loading, title, button }) => {
  const [user, setUser] = useState<UserDB | null>(
    initOrder ? initOrder.user : null
  );
  const [products, setProducts] = useState<OrderedProducts>(
    initOrder
      ? initOrder.products.reduce(
          (prev, product) => ({
            ...prev,
            [product.productId]: {
              quantity: product.quantity,
              product: product.product,
            },
          }),
          {}
        )
      : {}
  );
  const [submited, setSubmited] = useState(false);

  const handleSubmit = () => {
    setSubmited(true);
    if (user && Object.values(products).length) {
      button.onSubmit({ user, products });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <LinkBack>Ordenes</LinkBack>
      </Box>
      <Box sx={{ mb: 4 }}>{title}</Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FormCustomer
          error={submited && !user && 'Debes seleccionar un cliente.'}
          onChangeUser={setUser}
          initUser={initOrder?.user}
        />
        <FormProducts
          error={
            submited &&
            !Object.values(products).length &&
            'Debes seleccionar al menos un producto.'
          }
          onChangeProducts={setProducts}
          initProducts={products}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
        <LoadingButton
          size="large"
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
          loading={loading}
        >
          {button.text}
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default OrderForm;
