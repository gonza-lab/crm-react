import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { readAllProducts } from '../../../state/products/reducer';
import { readAllUsers } from '../../../state/users/slice';
import OrderForm from '../form/Form';

const OrderAddIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllUsers());
    dispatch(readAllProducts({ limit: 10 }));
  }, []);

  return <OrderForm />;
};

export default OrderAddIndex;
