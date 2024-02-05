import { HTTPPOST } from "../constant/request";
import type { CreatePenaltyProps, IPenalty } from "../interfaces/penalty";
import request from "../lib/axios";

export const createPenalty = (
  id: string,
  payload: CreatePenaltyProps
): Promise<IPenalty> =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { data, message },
        status,
      } = await request.Mutation<IPenalty>({
        url: `/penalty/${id}`,
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
