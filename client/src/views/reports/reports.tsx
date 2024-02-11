import ReportData from "../../components/mollecul/content/reportData";
import { useState, useEffect } from "react";
import type { SummaryData } from "../../interfaces/report";
import { getSummaryData } from "../../actions/report";
import { Activity } from "react-feather";
import { Link } from "react-router-dom";

export default function ReportPage() {
  const [data, setData] = useState<SummaryData[]>([]);

  useEffect(() => {
    if (!data.length)
      (async () => {
        setData(await getSummaryData());
      })();
  }, [data.length]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <h4>
                List of all reports <br />
              </h4>
              <p className="portlet-title">
                <span style={{ color: "#48C6EF" }}>
                  Details available by clicking on an icon
                </span>
              </p>
              <Link to={{ pathname: `/reports/details` }}>
                <Activity size="20" />
              </Link>
            </div>

            <div className="portlet-body" style={{ marginTop: "20px" }}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>YEAR</th>
                    <th>MONTH</th>
                    <th>NET</th>
                    <th>GROSS</th>
                    <th>PENALTIES</th>
                    <th>BONUSES</th>
                    <th>TAXES</th>
                    <th>SALARY</th>
                    <th>EMPLOYEES</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((el) => (
                    <ReportData key={`${el.year}-${el.month}`} data={el} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// {
//   $addFields: {
//     startDateMonth: {
//       $month:'$startdate'
//     },
//     startDateYear:{
//       $year:'$startdate'
//     },
//     age:{
//       $floor:{
//           $divide:[
//           {
//             $subtract:[ISODate('2024-02-11'),'$birthdate']
//           },
//           1000 * 60 * 60 * 24 * 365
//         ]
//       }
//     }
//   }
// },
