import BaseRoutes from "../base/router";
import adminController from "../controllers/admin";

export default new (class AdminRoute extends BaseRoutes {
  routes(): void {
    this.router
      .post("/login", adminController.login)
      .post("/google-login", adminController.googleLogin);
  }
})().router;
