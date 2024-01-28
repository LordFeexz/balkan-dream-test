import BaseRoutes from "../base/router";
import employeeController from "../controllers/employee";

export default new (class EmployeeRoute extends BaseRoutes {
  routes(): void {
    this.router.post("/register", employeeController.registerNewEmployee);
  }
})().router;
