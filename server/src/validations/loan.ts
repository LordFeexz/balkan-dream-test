import * as yup from "yup";
import BaseValidation from "../base/validation";
import type {
  CreateLoanPaymentProps,
  CreateLoanProps,
} from "../interfaces/loan";

export default new (class LoanValidation extends BaseValidation {
  private readonly createLoanSchema = yup.object().shape({
    amount: this.requiredAmount,
    date: this.optionalDate,
    description: this.optionalDesc,
    unit: this.requiredUnit,
    period: yup
      .number()
      .required("period is required")
      .min(1, "minimum period is 1")
      .max(12, "maximum period is 12"),
    note: yup.string().optional(),
  });

  public validateCreateLoan = async (data: any) =>
    await this.validate<CreateLoanProps>(this.createLoanSchema, data);

  public validateCreateLoanPayment = async (data: any) =>
    await this.validate<CreateLoanPaymentProps>(
      yup.object().shape({
        amount: this.requiredAmount,
        description: this.optionalDesc,
        date: this.optionalDate,
        unit: this.requiredUnit,
      }),
      data
    );
})();
