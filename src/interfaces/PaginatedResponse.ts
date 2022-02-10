interface Pagination {
  offset: number;
  total_count: number;
  count: number;
}

export interface PaginatedResponse<T> {
  pagination: Pagination;
  data: T;
}
