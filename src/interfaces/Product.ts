import ProductOrder from './ProductOrder';

export default interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  ProductOrder: ProductOrder;
}
