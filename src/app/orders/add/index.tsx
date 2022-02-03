import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { readAllUsers } from '../../../state/users/slice';
import OrderForm from '../form/Form';

const OrderAddIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllUsers());
  }, []);

  return <OrderForm />;
};

export default OrderAddIndex;
