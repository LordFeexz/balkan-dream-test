import type { Reducer, Action } from "redux";
import type { Employee, EmployeeDetail, GetListEmployee } from "../interfaces/employee";
import {
  type EmployeeTypes,
  GETLISTEMPLOYEE,
  SETACTIVESTATUS,
  SETINACTIVESTATUS,
} from "../constant/employee";

export interface EmployeeState {
  employees: EmployeeDetail[];
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
      const { employees, totalData, totalPage } = payload as GetListEmployee;
      return {
        ...state,
        employees,
        totalData,
        totalPage,
      };
    case SETACTIVESTATUS:
      return {
        ...state,
        employees: state.employees.map((el) =>
          el._id === payload ? { ...el, enddate: undefined } : el
        ),
      };
    case SETINACTIVESTATUS:
        return {
            ...state,
            employees: state.employees.map((el) =>
              el._id === payload ? { ...el, enddate: new Date().toDateString() } : el
            ),
          };
    default:
      return state;
  }
};

export default reducer;
