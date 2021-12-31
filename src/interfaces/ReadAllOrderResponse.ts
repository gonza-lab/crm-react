import OrderDB from './OrderDB';

export interface ReadAllOrderResponse extends Response {
  data: OrderDB[];
}
