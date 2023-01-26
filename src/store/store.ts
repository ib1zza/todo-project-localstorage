import { combineReducers, configureStore } from "@reduxjs/toolkit";

import TodoSlice from "./reducers/TodoSlice";



const rootReducer = combineReducers({
  todo: TodoSlice,

});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
