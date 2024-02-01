import type { Employee, GetListEmployee } from "../interfaces/employee";
import type {
  DataWithPagination,
  PaginationProps,
} from "../interfaces/request";
import request from "../lib/axios";
import type { ThunkAction } from "redux-thunk";
import type { EmployeeAction, EmployeeState } from "../reducer/employee";
import { GETLISTEMPLOYEE } from "../constant/employee";
import { RootReducer } from "../store";

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

      dispatch<EmployeeAction<GetListEmployee | any>>({
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
