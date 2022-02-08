import OrderStatusDB from './OrderStatusDB';
import ProductOrder from './ProductOrder';
import UserDB from './UserDB';

export default interface Order {
  id: number;
  user: UserDB;
  status: OrderStatusDB;
  products: ProductOrder[];
}
