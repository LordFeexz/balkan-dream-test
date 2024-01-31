import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  type Reducer,
} from "redux";
import { thunk } from "redux-thunk";

export interface RootReducer {}

const reducer: Reducer<RootReducer, never, any> = combineReducers({});

export default createStore(reducer, applyMiddleware(thunk));
