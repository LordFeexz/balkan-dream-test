import * as yup from "yup";
import BaseValidation from "../base/validation";
import type { UpdateSalaryProps } from "../interfaces/salary";

export default new (class SalaryValidation extends BaseValidation {
  public validateUpdateSalary = async (data: any) =>
    await this.validate<UpdateSalaryProps>(
      yup.object().shape({
        amount: this.requiredAmount,
        description: this.optionalDesc,
      }),
      data
    );
})();
