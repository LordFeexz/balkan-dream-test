import { HTTPPOST } from "../constant/request";
import type { LoginPayload } from "../interfaces/request";
import request from "../lib/axios";

export const loginHandler = ({
  email,
  password,
}: LoginPayload): Promise<string> =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { message, data },
        status,
      } = await request.Mutation<string>({
        url: "/admin/login",
        method: HTTPPOST,
        data: {
          email,
          password,
        },
      });

      if (status !== 200) throw { message };

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
