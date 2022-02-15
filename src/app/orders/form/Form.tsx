import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';

import FormCustomer from './customer/Customer';
import LinkBack from '../../shared/link-back/LinkBack';
import FormProducts, { OrderedProducts } from './products/Products';
import UserDB from '../../../interfaces/UserDB';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../state/orders/reducer';
import { RootState } from '../../../state/store';
import { OrderState, OrderStatus } from '../../../state/orders/slice';
import { AppDispatch } from '../../../state/store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const OrderForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<UserDB | null>();
  const [products, setProducts] = useState<OrderedProducts>({});
  const [submited, setSubmited] = useState(false);
  const { status } = useSelector<RootState, OrderState>(
    (state) => state.orders
  );
  const navigate = useNavigate();

  const handleSubmit = () => {
    setSubmited(true);
    if (user && Object.values(products).length) {
      dispatch(
        createOrder({
          userId: user.id,
          products: Object.values(products).map((value) => ({
            id: value.product.id,
            quantity: value.quantity,
          })),
          status: 1,
        })
      )
        .unwrap()
        .then(() => {
          navigate('/pedidos');
          toast.success('Se ha creado la orden con éxito.');
        })
        .catch(() => {
          toast.error(
            'Ha ocurrido un error al crear la orden. Porfavor, intentelo nuevamente.'
          );
        });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <LinkBack>Ordenes</LinkBack>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Nueva orden</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FormCustomer
          error={submited && !user && 'Debes seleccionar un cliente.'}
          onChangeUser={setUser}
        />
        <FormProducts
          error={
            submited &&
            !Object.values(products).length &&
            'Debes seleccionar al menos un producto.'
          }
          onChangeProducts={setProducts}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
        <LoadingButton
          size="large"
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
          loading={OrderStatus.creatingOrder === status}
        >
          Cargar Orden
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default OrderForm;
