import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokens: null,
  richlist: null,
};

const richlistSlice = createSlice({
  name: 'richlist',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
    setRichlist: (state, action) => {
      state.richlist = action.payload;
    },
  },
});

export const { setTokens, setRichlist } = richlistSlice.actions;

export const selectTokens = ({ richlist }) => richlist.richlist.tokens;
export const selectRichlist = ({ richlist }) => richlist.richlist.richlist;
export default richlistSlice.reducer;
