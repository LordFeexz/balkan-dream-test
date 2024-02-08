import BaseRoutes from "../base/router";
import penaltyController from "../controllers/penalty";

export default new (class PenaltyRoute extends BaseRoutes {
  routes(): void {
    this.router
      .get("/", penaltyController.getAll)
      .post("/bulk", penaltyController.createBulkPenalty)
      .post("/:employeeId", penaltyController.createPenalty);
  }
})().router;
