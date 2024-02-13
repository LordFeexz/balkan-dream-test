import { Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import ReportDataTable from "../../components/mollecul/content/reportDataTable";
import { useState, useEffect } from "react";
import type { SalaryPaymentDetail } from "../../interfaces/report";
import { getSummaryDetail } from "../../actions/report";
import EmployeeStatistic from "../../components/organ/content/employeeStatistic";

export default function ReportDetail() {
  const [data, setData] = useState<SalaryPaymentDetail[]>([]);

  useEffect(() => {
    if (!data.length)
      (async () => {
        setData(await getSummaryDetail());
      })();
  }, [data.length]);
  return (
    <div className="container">
      <div className="row navigation-row-2">
        <Link to="/reports" className="btn btn-hollow">
          <ArrowLeft size="18" className="button-left-icon" /> Go back to
          reports
        </Link>
      </div>

      <div>
        <header style={{ textAlign: "center" }}>
          <h4>
            {" "}
            List of all relevant employees for
            <span style={{ color: "#48C6EF", fontStyle: "italic" }}> </span>
          </h4>

          <p style={{ color: "#48C6EF", margin: "0px" }}>
            Further details available by clicking on an icon{" "}
          </p>
        </header>
        <hr />
      </div>

      <div className="row">
        <div className="col-lg-9">
          <div className="portlet-body2">
            <table className="table table-striped auto-index">
              <thead>
                <tr>
                  <th>No</th>
                  <th>NAME</th>
                  <th>NET</th>
                  <th>GROSS</th>
                  <th>PENALTIES</th>
                  <th>BONUSES</th>
                  <th>TAXES</th>
                  <th>SALARY</th>
                  <th>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, idx) => (
                  <ReportDataTable
                    key={`${el._id}-${el.surname}-${el.month}-${el.year}`}
                    data={el}
                    idx={idx}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-3">
          <EmployeeStatistic />
        </div>
      </div>
    </div>
  );
}
