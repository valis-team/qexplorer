import { combineReducers } from '@reduxjs/toolkit';
import richlist from './richlistSlice';

const reducer = combineReducers({
  richlist,
});

export default reducer;
