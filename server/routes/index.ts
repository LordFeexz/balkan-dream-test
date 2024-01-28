import BaseRoutes from "../base/router";

export default new (class Routes extends BaseRoutes {
  routes(): void {
    this.router.use();
  }
})().router;
