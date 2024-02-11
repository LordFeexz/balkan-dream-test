import type { SummaryData } from "../interfaces/report";
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
