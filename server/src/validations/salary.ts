import * as yup from "yup";
import BaseValidation from "../base/validation";
import type { UpdateSalaryProps } from "../interfaces/salary";

export default new (class SalaryValidation extends BaseValidation {
  public validateUpdateSalary = async (data: any) =>
    await this.validate<UpdateSalaryProps>(
      yup.object().shape({
        amount: yup
          .number()
          .required("amount is required")
          .min(1, "minimum salary input is 1"),
        description: yup.string().optional().default("N/A"),
      }),
      data
    );
})();
