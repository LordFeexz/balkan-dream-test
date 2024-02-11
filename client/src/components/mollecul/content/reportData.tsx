import type { SummaryData } from "../../../interfaces/report";

export interface ReportDataProps {
  data: SummaryData;
}

export default function ReportData({ data }: ReportDataProps) {
  return (
    <tr>
      <td>{data.year}</td>
      <td>{data.month}</td>
      <td>{data.net}</td>
      <td>{data.gross}</td>
      <td>{data.penalties}</td>
      <td>{data.bonuses}</td>
      <td>{data.tax}</td>
      <td>{data.salary}</td>
      <td>{data.employees}</td>
    </tr>
  );
}
