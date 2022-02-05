import { createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../service/ProductService';

const readAll = createAsyncThunk('products/read_all', productService.findAll);

export { readAll as readAllProducts };
