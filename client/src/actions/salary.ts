import { HTTPPATCH } from "../constant/request";
import type { ISalary, UpdateSalaryProps } from "../interfaces/salary";
import request from "../lib/axios";

export const raiseSalary = (
  id: string,
  payload: UpdateSalaryProps
): Promise<ISalary> =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        status,
        data: { data, message },
      } = await request.Mutation<ISalary>({
        url: `/salary/${id}`,
        method: HTTPPATCH,
        data: payload,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (status !== 200) throw { message };

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
