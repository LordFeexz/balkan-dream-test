import * as yup from "yup";
import BaseValidation from "../base/validation";
import type { CreatePenaltyProps } from "../interfaces/penalty";

export default new (class PenaltyValidation extends BaseValidation {
  public validateCreatePenalty = async (data: any) =>
    await this.validate<CreatePenaltyProps>(
      yup.object().shape({
        amount: yup.number().required("amount is required"),
        unit: yup
          .string()
          .required("unit is required")
          .oneOf(["BAM", "$"], "invalid unit"),
        description: yup.string().optional().default("N/A"),
        date: yup.date().optional().default(new Date()),
      }),
      data
    );
})();
