import BaseRoutes from "../base/router";
import penaltyController from "../controllers/penalty";

export default new (class PenaltyRoute extends BaseRoutes {
  routes(): void {
    this.router.post("/:employeeId", penaltyController.createPenalty);
  }
})().router;
