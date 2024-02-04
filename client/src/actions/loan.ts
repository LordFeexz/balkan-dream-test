import { HTTPPOST } from "../constant/request";
import type { CreateLoanProps, ILoan } from "../interfaces/loan";
import request from "../lib/axios";

export const createLoan = (
  id: string,
  payload: CreateLoanProps
): Promise<ILoan> =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        status,
        data: { data, message },
      } = await request.Mutation<ILoan>({
        data: payload,
        url: `/loan/${id}`,
        method: HTTPPOST,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (status !== 201) throw { message };

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
