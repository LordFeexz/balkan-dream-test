import * as yup from "yup";
import BaseValidation from "../base/validation";
import type { LoginAdminProps } from "../interfaces/admin";

export default new (class AdminValidations extends BaseValidation {
  public loginValidate = (data: any) =>
    this.validate<LoginAdminProps>(
      yup.object().shape({
        email: yup
          .string()
          .required("email is required")
          .email("invalid email format"),
        password: yup.string().required("password is required"),
      }),
      data
    );
})();
