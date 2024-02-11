import * as yup from "yup";
import BaseValidation from "../base/validation";
import type {
  GenerateSalaryProps,
  UpdateSalaryProps,
} from "../interfaces/salary";
import type { EmployeeSalaryDetail } from "../interfaces/employee";
import encryption from "../utils/encryption";

export default new (class SalaryValidation extends BaseValidation {
  public validateUpdateSalary = async (data: any) =>
    await this.validate<UpdateSalaryProps>(
      yup.object().shape({
        amount: this.requiredAmount,
        description: this.optionalDesc,
      }),
      data
    );

  public generateSalaryValidation = async (data: any) =>
    await this.validate<GenerateSalaryProps>(
      yup.object().shape({
        month: yup.number().required("month is required"),
        year: yup.number().required("year is required"),
      }),
      data
    );

  private readonly salaryUnitDetailSchema = yup.object().shape({
    _id: yup.string().required("_id is required"),
    amount: this.requiredAmount,
    description: this.optionalDesc,
    date: yup.string().required("date is required"),
  });

  public validateReleaseSalary = async (data: any, accessToken: string) =>
    await this.validate<{ datas: EmployeeSalaryDetail[]; signature: string }>(
      yup
        .object()
        .shape({
          signature: yup.string().required("signature is required"),
          datas: yup
            .array()
            .of(
              yup.object().shape({
                _id: yup.string().required("_id is required"),
                takeHomePay: yup.number().required("takeHomePay is required"),
                totalInstallment: yup
                  .number()
                  .required("installment is required"),
                totalBonus: yup.number().required("totalBonus is required"),
                totalPenalties: yup
                  .number()
                  .required("totalPenalties is required"),
                surname: yup.string().required("surname is required"),
                salary: yup.number().required("salary is required"),
                penalties: yup
                  .array()
                  .of(this.salaryUnitDetailSchema)
                  .required("penalties is required"),
                bonuses: yup
                  .array()
                  .of(this.salaryUnitDetailSchema)
                  .required("bonuses is required"),
                isLastInstallment: yup
                  .boolean()
                  .required("isLastInstallment is required"),
                loanDetail: yup
                  .object()
                  .shape({
                    _id: yup.string().required("_id is required"),
                    installment: yup
                      .number()
                      .required("installment is required"),
                    note: yup.string().required("note is required"),
                    totalLoan: yup.number().required("totalLoan is required"),
                  })
                  .nullable(),
              })
            )
            .required("datas is required"),
        })
        .test(
          "signature test",
          "invalid signature",
          ({ signature, datas }) =>
            encryption.signSignatureSalary(datas as any, accessToken) ===
            signature
        ),
      data
    );
})();
