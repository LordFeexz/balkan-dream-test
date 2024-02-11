import { Link } from "react-router-dom";
import { Activity } from "react-feather";

export default function ReportDataTable() {
  return (
    <tr>
      <td>{/* {getIds.next().value} */}</td>
      <td>{/* {item} */}</td>
      <td>{/* {netSalary[idx]} */}</td>
      <td>{/* {grossSalary[idx]} */}</td>
      <td>{/* {meals[idx]} */}</td>
      <td>{/* {taxes[idx]} */}</td>
      <td>{/* {handSalary[idx]} */}</td>
      <td className="table-actions">
        <Link to={{ pathname: `/reports/${"item"}` }}>
          <Activity size="20" />
        </Link>
      </td>
    </tr>
  );
}
