import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../state/store';

import Drawer from '../../shared/drawer/Drawer';

const OrdersDrawer: FunctionComponent<{ drawerWidth: number }> = ({
  drawerWidth,
}) => {
  const isOpenDrawer = useSelector<RootState, boolean>(
    (state) => state.orders.drawer.isOpen
  );

  return (
    <Drawer open={isOpenDrawer} drawerWidth={drawerWidth}>
      jejox el drawer
    </Drawer>
  );
};

export default OrdersDrawer;
