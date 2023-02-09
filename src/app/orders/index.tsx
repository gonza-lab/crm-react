import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { readAllOrders } from '../../state/orders/reducer';

const OrdersIndex = () => {
  // const dispatch = useDispatch();
  // const { data } = useGetOrdersQuery({ limit: 5 });

  // console.log(data);

  // useEffect(() => {
  //   dispatch(readAllOrders({ limit: 5 }));
  // }, []);

  return <Outlet />;
};

export default OrdersIndex;
