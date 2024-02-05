import * as yup from "yup";
import BaseValidation from "../base/validation";
import type { CreatePenaltyProps } from "../interfaces/penalty";

export default new (class PenaltyValidation extends BaseValidation {
  public validateCreatePenalty = async (data: any) =>
    await this.validate<CreatePenaltyProps>(
      yup.object().shape({
        amount: this.requiredAmount,
        unit: this.requiredUnit,
        description: this.optionalDesc,
        date: this.optionalDate,
      }),
      data
    );
})();
