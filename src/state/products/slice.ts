import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import ProductDB from '../../interfaces/ProductDB';
import { RootState } from '../store';
import { readAllProducts } from './reducer';

enum Status {
  idle = 'idle',
  readingProducts = 'reading products',
}

interface State {
  status: Status;
  error: null;
}

const productAdapter = createEntityAdapter<ProductDB>({});

const initialState = productAdapter.getInitialState<State>({
  status: Status.idle,
  error: null,
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

      productAdapter.upsertMany(state, action.payload);
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
