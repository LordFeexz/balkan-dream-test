import type { TabName } from "./context";

export type Gender = "M" | "F";

export type LoanUnit = "BAM" | "$";

export type LoanStatus = "Process" | "Finish" | "NPL";

export interface BaseDocument {
  createdAt: string;
  updatedAt: string;
}

export interface ProfileTabItem {
  id: number;
  name: TabName;
  active: boolean;
  confirmed: boolean;
}

export interface DisplayContent {
  amount: number;
  date: string;
  description: string;
  unit: LoanUnit;
}