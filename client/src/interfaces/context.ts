import type { EmployeeDetail } from "./employee";

export default interface GlobalContext {
  selectedUser: EmployeeDetail | null;
}
