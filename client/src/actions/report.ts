import type {
  EmployeeStatistic,
  SalaryPaymentDetail,
  SummaryData,
} from "../interfaces/report";
import request from "../lib/axios";

export const getSummaryData = (): Promise<SummaryData[]> =>
  new Promise(async (resolve) => {
    try {
      const {
        status,
        data: { data, message },
      } = await request.Query<SummaryData[]>({
        url: "/report/summary",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (status !== 200) throw { message };

      resolve(data);
    } catch (err) {
      resolve([]);
    }
  });

export const getSummaryDetail = (): Promise<SalaryPaymentDetail[]> =>
  new Promise(async (resolve) => {
    try {
      const {
        status,
        data: { data, message },
      } = await request.Query<SalaryPaymentDetail[]>({
        url: "/report/summary/detail",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (status !== 200) throw { message };

      resolve(data);
    } catch (err) {
      resolve([]);
    }
  });

export const getStatistic = (): Promise<EmployeeStatistic | null> =>
  new Promise(async (resolve) => {
    try {
      const {
        status,
        data: { data, message },
      } = await request.Query<EmployeeStatistic>({
        url: "/report/statistic",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (status !== 200) throw { message };

      resolve(data);
    } catch (err) {
      resolve(null);
    }
  });
