import BaseRoutes from "../base/router";
import loanController from "../controllers/loan";
import checkValidObjectId from "../middlewares/checkValidObjectId";

export default new (class LoanRoute extends BaseRoutes {
  routes(): void {
    this.router
      .post(
        "/payment/:employeeId",
        checkValidObjectId("employeeId"),
        loanController.createLoanExtraPayment
      )
      .post("/:employeeId", loanController.createLoan);
  }
})().router;
