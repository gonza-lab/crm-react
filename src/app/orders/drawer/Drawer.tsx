import { FunctionComponent } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { closeOrdersDrawer } from '../../../state/orders/slice';

import OrderStateDrawer from '../../../state/orders/interfaces/StateDrawer';

import { RootState } from '../../../state/store';

import Drawer from '../../shared/drawer/Drawer';
import OrdersDrawerContent from './content/Content';

const normalizeOrderId = (id: number | string) =>
  typeof id === 'string' ? +id : id;

const OrdersDrawer: FunctionComponent<{ drawerWidth: number }> = ({
  drawerWidth,
}) => {
  const dispatch = useDispatch();
  const drawer = useSelector<RootState, OrderStateDrawer>(
    (state) => state.orders.drawer
  );

  const closeDrawer = () => {
    dispatch(closeOrdersDrawer());
  };

  return (
    <Drawer open={drawer.isOpen} drawerWidth={drawerWidth}>
      {normalizeOrderId(drawer.orderId) && (
        <OrdersDrawerContent
          orderId={normalizeOrderId(drawer.orderId)}
          onClose={closeDrawer}
        />
      )}
    </Drawer>
  );
};

export default OrdersDrawer;
