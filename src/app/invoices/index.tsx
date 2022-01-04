import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { readAll as readAllOrders } from '../../state/orders/slice';

const InvoiceIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllOrders());
  }, []);

  return <Outlet />;
};

export default InvoiceIndex;
