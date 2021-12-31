import ProductDB from './ProductDB';
import UserDB from './UserDB';

export default interface Order {
  userId: number;
  product: ProductDB[];
  user?: UserDB;
}
