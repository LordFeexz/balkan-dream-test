import NetworkError from "../base/error";
import { HTTPPOST } from "../constant/request";
import type { BonusFormProps, IBonus } from "../interfaces/bonus";
import request from "../lib/axios";

export const CreateBonus = (
  id: string,
  payload: BonusFormProps
): Promise<IBonus> =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        status,
        data: { data, message },
      } = await request.Mutation<IBonus>({
        url: `/bonus/${id}`,
        method: HTTPPOST,
        data: payload,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (status !== 201) throw new NetworkError({ message });

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
