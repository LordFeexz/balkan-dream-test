import BaseRoutes from "../base/router";
import authentication from "../middlewares/authentication";
import admin from "./admin";
import employee from "./employee";
import loan from "./loan";
import salary from "./salary";

export default new (class Routes extends BaseRoutes {
  routes(): void {
    this.router
      .use("/admin", admin)
      .use(authentication)
      .use("/employee", employee)
      .use("/salary", salary)
      .use("/loan", loan);
  }
})().router;
