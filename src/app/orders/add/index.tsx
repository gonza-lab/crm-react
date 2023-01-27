import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { createOrder } from '../../../state/orders/reducer';
import { readAllUsers } from '../../../state/users/slice';
import OrderForm, { OrderFormOrder } from '../form/Form';
import { AppDispatch, RootState } from '../../../state/store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { OrderState, OrderStatus } from '../../../state/orders/slice';

const OrderAddIndex = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status } = useSelector<RootState, OrderState>(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(readAllUsers());
  }, []);

  const handleSubmit = ({ user, products }: OrderFormOrder) => {
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
