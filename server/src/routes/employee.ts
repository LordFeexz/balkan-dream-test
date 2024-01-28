import BaseRoutes from "../base/router";
import employeeController from "../controllers/employee";
import checkValidObjectId from "../middlewares/checkValidObjectId";

export default new (class EmployeeRoute extends BaseRoutes {
  routes(): void {
    this.router
      .post("/register", employeeController.registerNewEmployee)
      .delete(
        "/:employeeId",
        checkValidObjectId("employeeId"),
        employeeController.firedAEmployee
      );
  }
})().router;
