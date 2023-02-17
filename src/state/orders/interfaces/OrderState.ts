import OrderStatusDB from '../../../interfaces/OrderStatusDB';
import CountOrderStatus from '../enums/CountOrderStatus';
import OrderStatusStatus from '../enums/OrderStatusStatus';
import StateDrawer from './StateDrawer';

interface OrderState {
  status: {
    order_status: OrderStatusStatus;
    count_order_status: CountOrderStatus;
  };
  error: null;
  drawer: StateDrawer;
  total_count: number;
  order_status: OrderStatusDB[];
  table: {
    rowsPerPage: number;
    page: number;
  };
}

export default OrderState;
