import { useEffect } from 'react';

import { Typography } from '@mui/material';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import { readAllUsers } from '../../../state/users/slice';
import { AppDispatch } from '../../../state/store';
import { increaseOneTotalCount } from '../../../state/orders/slice';

import OrderForm, { OrderFormOrder } from '../form/Form';
import { useCreateOrderMutation } from '../../../state/orders/endpoints';

const OrderAddIndex = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    dispatch(readAllUsers());
  }, []);

  const handleSubmit = ({ user, products, status }: OrderFormOrder) => {
    createOrder({
      userId: user.id,
      products: Object.values(products).map((value) => ({
        id: value.product.id,
        quantity: value.quantity,
      })),
      status: status.id,
    })
      .unwrap()
      .then(() => {
        dispatch(increaseOneTotalCount());
        navigate('/pedidos');
        toast.success('Se ha creado la orden con éxito.');
      })
      .catch(() => {
        toast.error(
          'Ha ocurrido un error al crear la orden. Porfavor, intentelo nuevamente.'
        );
      });
  };

  return (
    <OrderForm
      button={{
        onSubmit: handleSubmit,
        text: 'Cargar orden',
      }}
      loading={isLoading}
      title={<Typography variant="h4">Nueva orden</Typography>}
    />
  );
};

export default OrderAddIndex;
