import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { countOrders } from '../../state/orders/reducer';

const OrdersIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countOrders());
  }, []);

  return <Outlet />;
};

export default OrdersIndex;
