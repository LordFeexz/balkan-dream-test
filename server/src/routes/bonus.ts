import BaseRoutes from "../base/router";
import bonusController from "../controllers/bonus";

export default new (class BonusRoute extends BaseRoutes {
  routes(): void {
    this.router.post("/:employeeId", bonusController.createBonus);
  }
})().router;
