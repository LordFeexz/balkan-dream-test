import type { EmployeeLoan } from "../../../interfaces/loan";

export interface LoanDataProps {
  data: EmployeeLoan;
}

export default function LoanData({ data }: LoanDataProps) {
  return (
    <tr>
      <td> {data.employee.name}</td>
      <td> 1</td>
      <td> {data.installment}</td>
      <td>
        {" "}
        {data.amount -
          (data?.paymentHistory
            ?.map((el) => el.amount)
            .reduce(
              (accumulator, currentValue) => accumulator - currentValue,
              data.amount
            ) || data.amount)}
      </td>
      <td> {data.note?.description || "N/A"}</td>
    </tr>
  );
}
