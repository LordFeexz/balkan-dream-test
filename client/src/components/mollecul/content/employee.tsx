import type { Employee } from "../../../interfaces/employee";
import { XCircle, CheckCircle } from "react-feather";
import { Link } from "react-router-dom";

export interface EmployeeDetailProps {
  employee: Employee;
}

function isActiveEmployee(active: boolean) {
  return active ? (
    <a
      className="table-actions"
      style={{ cursor: "pointer" }}
      title="Set the employee as active, again?"
      // onClick={this.setEmployeeAsActive.bind(this, item.rowNumber)}
    >
      <CheckCircle size="18" color="lime" />
    </a>
  ) : (
    <a
      className="table-actions"
      title="Set the employee as inactive?"
      style={{ cursor: "pointer" }}
      // onClick={this.setEmployeeAsInactive.bind(this, item.rowNumber)}
    >
      <XCircle size="18" />
    </a>
  );
}

export default function EmployeeDetail({ employee }: EmployeeDetailProps) {
  return (
    <tr key={employee.JMBG}>
      <td>
        <Link to={`/employees/${employee.JMBG}`}> {employee.name} </Link>{" "}
      </td>
      <td>{employee.surname}</td>
      <td>{employee.position}</td>
      <td className="status-column">
        <i
          className={`fa fa-circle ${
            !employee.enddate ? "employeeactive" : "employeeinactive"
          }`}
        ></i>
      </td>
      <td>{isActiveEmployee(!!employee.enddate)}</td>
    </tr>
  );
}
