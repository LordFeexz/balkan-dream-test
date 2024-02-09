export interface EmployeeSalaryListProps {
  item: any;
}

export default function EmployeeSalaryList({ item }: EmployeeSalaryListProps) {
  return (
    <tr key={item.jmbg}>
      <td className="salaries-table__decoration">{item.name}</td>
      <td>{item.totalNetSalary}</td>
      <td className="salaries-table__decoration">{item.totalGrossSalary}</td>
      <td>{item.bankGrossSalary}</td>
      <td>{item.bankNetSallary}</td>
      <td>{item.bankContributes}</td>
      <td className="salaries-table__decoration">{item.bankHotMeal}</td>
      <td>{item.handSalary}</td>
      <td>{item.handBonus}</td>
      <td>{item.handPenalty}</td>
      <td className="salaries-table__decoration">{item.handTotal}</td>
      <td>{item.loan}</td>
      <td>{item.installment}</td>
      <td>{item.note}</td>
    </tr>
  );
}
