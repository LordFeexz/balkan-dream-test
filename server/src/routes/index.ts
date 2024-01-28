import BaseRoutes from "../base/router";
import employee from "./employee";

export default new (class Routes extends BaseRoutes {
  routes(): void {
    this.router.use("/employee", employee);
  }
})().router;
