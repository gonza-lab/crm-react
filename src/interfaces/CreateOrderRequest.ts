export interface CreateOrderRequest {
  status: number;
  products: { id: number; quantity: number }[];
  userId: number;
}
