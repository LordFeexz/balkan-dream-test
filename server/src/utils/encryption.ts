import { createHmac, createHash } from "crypto";
import minify from "jsonminify";
import { EmployeeSalaryDetail } from "../interfaces/employee";

export default new (class Encryption {
  public objectToSign(data: object) {
    const hash = createHash("sha256");
    hash.update(minify(JSON.stringify(data)));

    return hash.digest("hex").toLowerCase();
  }

  public signSignatureSalary(
    data: EmployeeSalaryDetail[],
    accessToken: string
  ) {
    const hmac = createHmac("sha512", "Salary");
    hmac.update(this.objectToSign(data) + ":" + accessToken);

    return hmac.digest("base64");
  }
})();
