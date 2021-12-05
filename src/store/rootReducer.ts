import { combineReducers } from "@reduxjs/toolkit";
import { reducer as fieldReducer } from "../slices/fieldsValue";
import { reducer as counterSlice } from "../slices/counter";

const rootReducer = combineReducers({
  counter: counterSlice,
  fieldsValue: fieldReducer,
});

export default rootReducer;
