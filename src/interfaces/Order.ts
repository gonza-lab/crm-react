import ProductDB from './ProductDB';
import UserDB from './UserDB';

export default interface Order {
  id: number;
  products: ProductDB[];
  user: UserDB;
}
