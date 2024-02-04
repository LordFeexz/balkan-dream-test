import BaseValidation from "../base/validation";
import * as yup from "yup";
import type { BonusFormProps } from "../interfaces/bonus";

export default new (class BonusValidation extends BaseValidation {
  public validateCreateBonus = async (data: any) =>
    await this.validate<BonusFormProps>(
      yup.object().shape({
        amount: yup.number().required("amount is required"),
        date: yup.date().optional().default(new Date()),
        description: yup.string().optional().default("N/A"),
        isRepeating: yup.boolean().optional().default(false),
        unit: yup
          .string()
          .required("unit is required")
          .oneOf(["BAM", "$"], "invalid unit"),
      }),
      data
    );
})();
