import * as yup from "yup";
import BaseValidation from "../base/validation";
import type { CreateLoanProps } from "../interfaces/loan";

export default new (class LoanValidation extends BaseValidation {
  private readonly createLoanSchema = yup.object().shape({
    amount: yup
      .number()
      .required("amount is required")
      .min(1, "amount must be greater than 0"),
    date: yup.date().optional().default(new Date()),
    description: yup.string().optional().default("N/A"),
    unit: yup
      .string()
      .required("unit is required")
      .oneOf(["BAM", "$"], "invalid unit"),
    employeeId: yup.string().required("employeeId is required"),
    period: yup
      .number()
      .required("period is required")
      .min(1, "minimum period is 1")
      .max(12, "maximum period is 12"),
    note: yup.string().optional(),
  });

  public validateCreateLoan = async (data: any) =>
    await this.validate<CreateLoanProps>(this.createLoanSchema, data);
})();
