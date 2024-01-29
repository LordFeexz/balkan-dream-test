export default new (class Helper {
  public countInstallment = (amount: number, period: number, fee = 0) =>
    Math.ceil(amount / period) + fee;
})();
