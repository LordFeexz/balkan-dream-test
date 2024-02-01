import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  type Reducer,
} from "redux";
import { thunk } from "redux-thunk";
import employeeReducer, {
  type EmployeeState,
  type EmployeeAction,
} from "../reducer/employee";
import type { Employee } from "../interfaces/employee";

export interface RootReducer {
  employeeReducer: EmployeeState;
}

const reducer: Reducer<
  RootReducer,
  EmployeeAction<Employee>,
  any
> = combineReducers({ employeeReducer });

export default createStore(reducer, applyMiddleware(thunk));
