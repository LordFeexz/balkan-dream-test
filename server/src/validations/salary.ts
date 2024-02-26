import * as yup from "yup";
import BaseValidation from "../base/validation";
import type { UpdateSalaryProps } from "../interfaces/salary";
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

  private readonly salaryUnitDetailSchema = yup.object().shape({
    _id: yup.string().required("_id is required"),
    amount: this.requiredAmount,
    description: this.optionalDesc,
    date: yup.string().required("date is required"),
  });

  public validateReleaseSalary = async (data: any) =>
    await this.validate<{ datas: EmployeeSalaryDetail[] }>(
      yup.object().shape({
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
                  installment: yup.number().required("installment is required"),
                  note: yup.string().required("note is required"),
                  totalLoan: yup.number().required("totalLoan is required"),
                })
                .nullable(),
            })
          )
          .required("datas is required"),
      }),
      data
    );
})();
