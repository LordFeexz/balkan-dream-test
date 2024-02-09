import { DownloadTableExcel } from "react-export-table-to-excel";
import { useRef } from "react";
import EmployeeSalaryList from "../../mollecul/content/employeeSalary";

export default function SalaryTable() {
  const tableRef = useRef<HTMLTableElement>(null);
  return (
    <div className="portlet portlet-boxed">
      <div className="portlet-body portlet-body-salaries">
        <DownloadTableExcel
          filename="Salaries"
          sheet="Preview"
          currentTableRef={tableRef.current}
        >
          <button className="btn btn-hollow plus">Download as XLS</button>
        </DownloadTableExcel>
        <table
          className="table table-striped mt-20"
          id="salariesTable"
          ref={tableRef}
        >
          <thead>
            <tr>
              <th className="salaries-table__first-col salaries-table__decoration">
                Full name
              </th>
              <th>Total Net Salary</th>
              <th className="salaries-table__decoration">Total Gross Salary</th>
              <th>Bank Gross Salary</th>
              <th>Bank Net Salary</th>
              <th>Bank Contributes</th>
              <th className="salaries-table__decoration">Bank Hot Meal</th>
              <th>Hand Salary</th>
              <th>Hand Bonus</th>
              <th>Hand Penalty</th>
              <th className="salaries-table__decoration">Hand Total</th>
              <th>Loan</th>
              <th>Installment</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {[].map((el) => (
              <EmployeeSalaryList item={el} key={el} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
