import BaseRoutes from "../base/router";
import authentication from "../middlewares/authentication";
import admin from "./admin";
import employee from "./employee";
import loan from "./loan";

export default new (class Routes extends BaseRoutes {
  routes(): void {
    this.router
      .use("/admin", admin)
      .use(authentication)
      .use("/employee", employee)
      .use("/loan", loan);
  }
})().router;
