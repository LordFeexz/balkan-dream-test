import type { Reducer, Action } from "redux";
import type { Employee, GetListEmployee } from "../interfaces/employee";
import { type EmployeeTypes, GETLISTEMPLOYEE } from "../constant/employee";

export interface EmployeeState {
  employees: Employee[];
  totalData: number;
  totalPage: number;
}

export type EmployeeAction<T = any> = {
  payload: T;
} & Action<EmployeeTypes>;

const initialState: EmployeeState = {
  employees: [],
  totalData: 0,
  totalPage: 0,
};

const reducer: Reducer<EmployeeState, EmployeeAction> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GETLISTEMPLOYEE:
      const { employees, totalData, totalPage } =
        payload as GetListEmployee;
      return {
        ...state,
        employees,
        totalData,
        totalPage,
      };
    default:
      return state;
  }
};

export default reducer;
