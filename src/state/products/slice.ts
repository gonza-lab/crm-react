import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import ProductDB from '../../interfaces/ProductDB';
import { RootState } from '../store';
import { readAllProducts } from './reducer';

enum Status {
  idle = 'idle',
  readingProducts = 'reading products',
}

export interface ProductState {
  status: Status;
  error: null;
  total_count: number;
}

const productAdapter = createEntityAdapter<ProductDB>({});

const initialState = productAdapter.getInitialState<ProductState>({
  status: Status.idle,
  error: null,
  total_count: 0,
});

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readAllProducts.pending, (state) => {
      state.status = Status.readingProducts;
    });

    builder.addCase(readAllProducts.fulfilled, (state, action) => {
      state.status = Status.idle;

      state.total_count = action.payload.pagination.total_count;
      productAdapter.setAll(state, action.payload.data);
    });
  },
});

export const {
  selectAll: selectAllProducts,
  selectIds: selectProductsIds,
  selectById: selectProductById,
} = productAdapter.getSelectors<RootState>((state) => state.products);

export { Status as ProductStoreStatus };
export default slice.reducer;
