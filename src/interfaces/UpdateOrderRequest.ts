export interface UpdateOrderRequest {
  status?: number;
  products?: { id: number; quantity: number }[];
  userId?: number;
}
