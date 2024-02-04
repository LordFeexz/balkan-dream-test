import type { ContextValue } from "../context/tabContent";
import type { DisplayContent } from "../interfaces";

export const getActiveEmployeeTabContent = (
  activeTab: string,
  { penalties, loanPayments, loans, salary, bonuses }: ContextValue
) => {
  switch (activeTab) {
    case "Bonuses":
      return bonuses.map(mapData);
    case "Penalties":
      return penalties.map(mapData);
    case "Loans":
      return loans.map((el) => ({
        date: el.date,
        amount: el.amount,
        description: el.description,
        unit: el.unit,
      }));
    case "Loan Extra Payments":
      return loanPayments.map((el) => ({
        date: el.date,
        amount: el.amount,
        description: el.description,
        unit: el.unit,
      }));
    case "Salary Raises":
    default:
      return salary.historyRaises.map(mapData);
  }
};

export const mapData = (el: DisplayContent) => ({
  date: el.date,
  amount: el.amount,
  description: el.description,
  unit: el.unit,
});
