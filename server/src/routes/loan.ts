import BaseRoutes from "../base/router";
import loanController from "../controllers/loan";

export default new (class LoanRoute extends BaseRoutes {
  routes(): void {
    this.router.post("/:employeeId", loanController.createLoan);
  }
})().router;
