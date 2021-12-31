import ProductDB from './ProductDB';

export default interface Order {
  userId: number;
  product: ProductDB[];
}
