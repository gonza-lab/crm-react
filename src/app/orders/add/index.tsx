import { useEffect } from 'react';

import { Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import { createOrder } from '../../../state/orders/reducer';
import { readAllUsers } from '../../../state/users/slice';
import { AppDispatch, RootState } from '../../../state/store';
import { OrderStatus } from '../../../state/orders/slice';

import OrderForm, { OrderFormOrder } from '../form/Form';

const OrderAddIndex = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const status = useSelector<RootState, OrderStatus>(
    (state) => state.orders.status.order
  );

  useEffect(() => {
    dispatch(readAllUsers());
  }, []);

  const handleSubmit = ({ user, products, status }: OrderFormOrder) => {
    dispatch(
      createOrder({
        userId: user.id,
        products: Object.values(products).map((value) => ({
          id: value.product.id,
          quantity: value.quantity,
        })),
        status: status.id,
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
  };

  return (
    <OrderForm
      button={{
        onSubmit: handleSubmit,
        text: 'Cargar orden',
      }}
      loading={status === OrderStatus.creatingOrder}
      title={<Typography variant="h4">Nueva orden</Typography>}
    />
  );
};

export default OrderAddIndex;
