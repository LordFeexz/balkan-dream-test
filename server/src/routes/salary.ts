import BaseRoutes from "../base/router";
import salaryController from "../controllers/salary";

export default new (class SalaryRoute extends BaseRoutes {
  routes(): void {
    this.router
      .patch("/:employeeId", salaryController.raiseUp)
      .patch("/:employeeId", salaryController.generateSalary);
  }
})().router;
