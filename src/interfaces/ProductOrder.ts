import ProductDB from './ProductDB';

export default interface ProductOrder {
  orderId: number;
  productId: number;
  quantity: number;
  product: ProductDB;
}
