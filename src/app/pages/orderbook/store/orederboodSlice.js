import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokens: null,
  orderbook: null,
};

const orderboodSlice = createSlice({
  name: 'orderbood',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
    setorderbook: (state, action) => {
      state.orderbook = action.payload;
    },
  },
});

export const { setTokens, setorderbook } = orderboodSlice.actions;

export const selectTokens = ({ orderbook }) => orderbook.orderbook.tokens;
export const selectorderbook = ({ orderbook }) => orderbook.orderbook.orderbook;
export default orderboodSlice.reducer;
