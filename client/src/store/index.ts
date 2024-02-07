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
import loanReducer, { type LoanAction, type LoanState } from "../reducer/loan";

export interface RootReducer {
  employeeReducer: EmployeeState;
  loanReducer: LoanState;
}

const reducer: Reducer<
  RootReducer,
  EmployeeAction<any> & LoanAction<any>,
  any
> = combineReducers({ employeeReducer, loanReducer });

export default createStore(reducer, applyMiddleware(thunk));
