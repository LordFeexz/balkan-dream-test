import { Link } from "react-router-dom";
import { Activity } from "react-feather";
import type { SalaryPaymentDetail } from "../../../interfaces/report";

export interface ReportDataTableProps {
  data: SalaryPaymentDetail;
  idx: number;
}

export default function ReportDataTable({ data, idx }: ReportDataTableProps) {
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{data.surname}</td>
      <td>{data.net}</td>
      <td>{data.gross}</td>
      <td>{data.penalties}</td>
      <td>{data.bonuses}</td>
      <td>{data.tax}</td>
      <td>{data.salary}</td>
      <td className="table-actions">
        <Link to={{ pathname: `/reports/${data._id}` }}>
          <Activity size="20" />
        </Link>
      </td>
    </tr>
  );
}
