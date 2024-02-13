import BaseRoutes from "../base/router";
import reportController from "../controllers/report";

export default new (class ReportRoute extends BaseRoutes {
  routes(): void {
    this.router
      .get("/summary", reportController.getSummaryData)
      .get("/summary/detail", reportController.getSummaryDetail)
      .get("/statistic", reportController.getEmployeeStatistic);
  }
})().router;
