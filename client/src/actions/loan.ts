import { HTTPPOST } from "../constant/request";
import type {
  CreateLoanPaymentProps,
  CreateLoanProps,
  ILoan,
} from "../interfaces/loan";
import { ILoanPayment } from "../interfaces/loanPayment";
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

export const createLoanExtraPayment = (
  id: string,
  payload: CreateLoanPaymentProps
): Promise<ILoanPayment> =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        status,
        data: { data, message },
      } = await request.Mutation<ILoanPayment>({
        url: `/loan/payment/${id}`,
        method: HTTPPOST,
        data: payload,
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
