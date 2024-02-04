export default new (class Helper {
  public countInstallment = (amount: number, period: number, fee = 0) =>
    Math.ceil(amount / period) + fee;

  public getSortDirection(direction: string) {
    switch (direction.toLowerCase()) {
      case "desc":
      case "descending":
        return -1;
      case "asc":
      case "ascending":
      default:
        return 1;
    }
  }

  public getUserSearch(search: string) {
    const regex = new RegExp(search);
    const obj = {
      $regex: regex,
      $options: "i",
    };
    return [
      {
        position: obj,
      },
      {
        name: obj,
      },
      {
        surname: obj,
      },
      {
        JMBG: obj,
      },
    ];
  }

  public allowedSortedField(
    allowed: string[],
    field: string,
    defaultValue: string
  ) {
    return allowed.includes(field) ? field : defaultValue;
  }

  public readableDate(date: Date | string) {
    const d = new Date(date);

    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  }
})();
