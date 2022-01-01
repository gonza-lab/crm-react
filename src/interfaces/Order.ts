import OrderStatus from './OrderStatus';
import ProductDB from './ProductDB';
import UserDB from './UserDB';

export default interface Order {
  id: number;
  userId: number;
  product: ProductDB[];
  user?: UserDB;
  statusId: number;
  status: OrderStatus;
}
