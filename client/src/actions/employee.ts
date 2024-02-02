import type {
  AddEmployeeState,
  Employee,
  GetListEmployee,
} from "../interfaces/employee";
import type {
  DataWithPagination,
  PaginationProps,
} from "../interfaces/request";
import request from "../lib/axios";
import type { ThunkAction } from "redux-thunk";
import type { EmployeeAction } from "../reducer/employee";
import { GETLISTEMPLOYEE } from "../constant/employee";
import { RootReducer } from "../store";
import { HTTPPOST } from "../constant/request";

export const getListEmployee = ({
  page = 1,
  limit = 20,
  sortBy = "createdAt",
}: PaginationProps): ThunkAction<
  Promise<DataWithPagination<Employee[]>>,
  RootReducer,
  any,
  EmployeeAction<GetListEmployee>
> => async (dispatch, getState) =>
  new Promise(async (resolve) => {
    try {
      const {
        status,
        data: { message, data, totalData, totalPage },
      } = await request.Query<Employee[]>({
        url: "/employee",
        params: { page, limit, sortBy },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (status !== 200) throw { message };
      const { employeeReducer } = getState();

      dispatch<EmployeeAction<GetListEmployee>>({
        type: GETLISTEMPLOYEE,
        payload: {
          employees: [...employeeReducer.employees, ...data],
          totalData,
          totalPage,
        },
      });

      resolve({ data, totalData, totalPage });
    } catch (err) {
      resolve({ data: [], totalData: 0, totalPage: 0 });
    }
  });

export const addEmployee = (
  data: AddEmployeeState
): ThunkAction<
  Promise<Employee>,
  RootReducer,
  any,
  EmployeeAction<Employee>
> => async (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { message, data: result },
        status,
      } = await request.Mutation<Employee>({
        url: "/employee/register",
        data,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        method: HTTPPOST,
      });

      if (status !== 201) throw { message };

      const {
        employeeReducer: { employees, totalData, totalPage },
      } = getState();

      dispatch<EmployeeAction<GetListEmployee | any>>({
        type: GETLISTEMPLOYEE,
        payload: {
          employees: [...employees, result],
          totalData: totalData + 1,
        },
      });

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
