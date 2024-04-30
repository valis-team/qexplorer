import { combineReducers } from '@reduxjs/toolkit';
import orderbook from './orederboodSlice';

const reducer = combineReducers({
  orderbook,
});

export default reducer;
