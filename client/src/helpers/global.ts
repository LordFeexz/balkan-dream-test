import { months } from "../constant/month";
import type { ContextValue } from "../context/tabContent";
import type { DisplayContent, DisplaySalaryTab } from "../interfaces";
import { EmployeeSalaryDetail } from "../interfaces/employee";

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

export const getActiveSalaryTabContent = (
  activeTab: string,
  datas: EmployeeSalaryDetail[]
): DisplaySalaryTab[] => {
  const results: DisplaySalaryTab[] = [];
  for (const data of datas) {
    switch (activeTab) {
      case "Bonuses": {
        for (const { date, description, amount } of data.bonuses) {
          const dateDisplay = new Date(date);
          results.push({
            date: `${dateDisplay.getDate()}-${
              months[dateDisplay.getMonth()].label
            }-${dateDisplay.getFullYear()}`,
            description,
            amount,
            surname: data.surname,
          });
        }

        break;
      }
      case "Penalties": {
        for (const { date, description, amount } of data.penalties) {
          const dateDisplay = new Date(date);
          results.push({
            date: `${dateDisplay.getDate()}-${
              months[dateDisplay.getMonth()].label
            }-${dateDisplay.getFullYear()}`,
            description,
            amount,
            surname: data.surname,
          });
        }
        break;
      }
      case "Loans": {
        const now = new Date();
        if (data.loanDetail)
          results.push({
            surname: data.surname,
            amount: data.loanDetail.installment,
            description: data.loanDetail.note,
            date: `${now.getDate()}-${
              months[now.getMonth()].label
            }-${now.getFullYear()}`,
          });
        break;
      }
      case "Salary Raises": {
        const now = new Date();
        results.push({
          surname: data.surname,
          amount: data.takeHomePay,
          date: `${now.getDate()}-${
            months[now.getMonth()].label
          }-${now.getFullYear()}`,
          description: "total net salary",
        });
        break;
      }
      default:
        break;
    }
  }
  return results;
};

export const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
