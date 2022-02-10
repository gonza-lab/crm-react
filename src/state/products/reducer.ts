import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginatedRequest } from '../../interfaces/PaginatedRequest';
import productService from '../../service/ProductService';

const readAll = createAsyncThunk(
  'products/read_all',
  async (options?: PaginatedRequest) => {
    return await productService.findAll(options);
  }
);

export { readAll as readAllProducts };
