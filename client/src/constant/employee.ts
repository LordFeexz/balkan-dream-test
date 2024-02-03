export const GETLISTEMPLOYEE: EmployeeTypes = "GET-LIST-EMPLOYEE";

export const ADDNEWEMPLOYEE: EmployeeTypes = "ADD-NEW-EMPLOYEE";

export const SETACTIVESTATUS: EmployeeTypes = "SET-ACTIVE-EMPLOYEE";

export const SETINACTIVESTATUS: EmployeeTypes = "SET-INACTIVE-EMPLOYEE";

export type EmployeeTypes =
  | "GET-LIST-EMPLOYEE"
  | "ADD-NEW-EMPLOYEE"
  | "SET-ACTIVE-EMPLOYEE"
  | "SET-INACTIVE-EMPLOYEE";
