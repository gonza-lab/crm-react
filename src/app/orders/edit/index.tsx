import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import OrderDB from '../../../interfaces/OrderDB';
import OrderService from '../../../service/OrderService';
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from '../../../state/orders/endpoints';
import { AppDispatch } from '../../../state/store';
import { readAllUsers } from '../../../state/users/slice';
import OrderForm, { OrderFormOrder } from '../form/Form';

const OrderEditIndex = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <></>;
  const [order, setOrder] = useState<OrderDB>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data: stateOrder } = useGetOrderByIdQuery(+id);
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  useEffect(() => {
    dispatch(readAllUsers());

    const readOrder = async () => {
      const orderRes = await OrderService.readOne({ id });
      setOrder(orderRes);
    };

    if (stateOrder) {
      setOrder(stateOrder);
    } else {
      readOrder();
    }
  }, []);

  const handleSubmit = (order: OrderFormOrder) => {
    updateOrder({
      id: +id,
      data: {
        status: order.status.id,
        products: Object.values(order.products).map((value) => ({
          id: value.product.id,
          quantity: value.quantity,
        })),
      },
    })
      .unwrap()
      .then(() => {
        navigate('/pedidos');
        toast.success('Se ha actualizado la orden con éxito.');
      })
      .catch(() => {
        toast.error(
          'Ha ocurrido un error al actualizar la orden. Porfavor, intentelo nuevamente.'
        );
      });
  };

  return order ? (
    <OrderForm
      button={{
        onSubmit: handleSubmit,
        text: 'Actualizar orden',
      }}
      loading={isLoading}
      title={<Typography variant="h4">Editar orden #{order.id}</Typography>}
      initOrder={order}
    />
  ) : (
    <></>
  );
};

export default OrderEditIndex;
