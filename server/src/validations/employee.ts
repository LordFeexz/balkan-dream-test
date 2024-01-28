import BaseValidation from "../base/validation";
import * as yup from "yup";
import type { Employee } from "../interfaces/employee";

export default new (class EmployeeValidations extends BaseValidation {
  public validateNewEmployee = async (data: any) =>
    await this.validate<Employee>(
      yup.object().shape({
        name: yup.string().required("name is required"),
        surname: yup.string().required("surname is required"),
        JMBG: yup
          .string()
          .required("JMBG is required")
          .test(
            "13 characters",
            "JMBG must 13 character",
            (val) => val.length === 13
          ),
        birthdate: yup.date().required("birthdate is required"),
        gender: yup
          .string()
          .required("gender is required")
          .oneOf(["M", "F"], "invalid gender"),
        position: yup.string().required("position is required"),
        startdate: yup.date().optional().default(new Date()),
        isPayoneer: yup.boolean().optional().default(false),
      }),
      data
    );
})();
