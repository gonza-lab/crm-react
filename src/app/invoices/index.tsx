import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { readAllOrders } from '../../state/orders/reducer';

const InvoiceIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllOrders());
  }, []);

  return <Outlet />;
};

export default InvoiceIndex;
