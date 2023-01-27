import { PaginatedRequest } from './PaginatedRequest';

export interface ReadOneOrderRequest {
  id: string | number;
  options?: PaginatedRequest;
}
