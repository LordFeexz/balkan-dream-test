import { Link } from "react-router-dom";
import { ArrowLeft, PieChart } from "react-feather";
import ReportDataTable from "../../components/mollecul/content/reportDataTable";

export default function ReportDetail() {
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
            <span style={{ color: "#48C6EF", fontStyle: "italic" }}>
              {" "}
              {/* {displayDate}{" "} */}
            </span>
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
                  <th>MEALS</th>
                  <th>TAXES</th>
                  <th>SALARY</th>
                  <th>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {[1].map((el) => (
                  <ReportDataTable key={el} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <h6>
                {" "}
                Total number of employees{" "}
                <i className={`fa fa-long-arrow-right`} />
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#3291b6",
                    fontWeight: "bold",
                    letterSpacing: "3px",
                    fontSize: "2rem",
                  }}
                >
                  {" "}
                  {/* {dataTable.length}{" "} */}
                </span>
              </h6>
            </div>
          </div>

          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <h4 className="portlet-title">Male vs. Female Ratio</h4>
            </div>
            <div
              className="portlet-body"
              style={{
                textAlign: "center",
                fontWeight: "400",
                letterSpacing: "2px",
              }}
            >
              <p>
                {" "}
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#1E91B5",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  Male
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />
                {/* {maleData} % */}
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#BE95C4",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  Female
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />
                {/* {femaleData} % */}
              </p>
              <PieChart
                className="col-md-4"
                size={220}

                // innerHoleSize={110}
                // data={
                //   [
                //     //   { key: "Men", value: maleData, color: "#9cd2e2" },
                //     //   { key: "Women", value: femaleData, color: "#d6badb" }
                //   ] as any
                // }
                // styles={{
                //   ".chart_text": {
                //     fontSize: "2em",
                //     fontFamily: "serif",
                //     fontWeight: "bold",
                //     fill: "#00000",
                //   },
                // }}
              />
            </div>
          </div>

          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <h4 className="portlet-title">
                Active vs. Inactive Stats <br />
                ON DATE <i className={`fa fa-long-arrow-down`} />
                <br />
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#3291b6",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  {" "}
                  {/* {currentDate} */}
                </span>
              </h4>
            </div>
            <div
              className="portlet-body"
              style={{
                textAlign: "center",
                fontWeight: "400",
                letterSpacing: "2px",
              }}
            >
              <p>
                {" "}
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#36b35e",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  Active
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />
                {/* {activeStats} % */}
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#c93c3c",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  Inactive
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />
                {/* {notActiveStats} % */}
              </p>
              <PieChart
                className="col-md-4"
                size={220}
                // innerHoleSize={110}
                // data={
                //   [
                //     //   { key: "Active", value: activeStats, color: "#36b35e" },
                //     //   { key: "Inactive", value: notActiveStats, color: "#c93c3c" }
                //   ] as any
                // }
                // styles={{
                //   ".chart_text": {
                //     fontSize: "2em",
                //     fontFamily: "serif",
                //     fontWeight: "bold",
                //     fill: "#00000",
                //   },
                // }}
              />
            </div>
          </div>

          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <h4 className="portlet-title">Position Statistics</h4>
            </div>
            <div
              className="portlet-body"
              style={{
                textAlign: "center",
                fontWeight: "400",
                letterSpacing: "2px",
              }}
            >
              <p>
                {" "}
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#3566ba",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  DEV
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />
                {/* {devStats} % */}
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#5db84e",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  QA
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />
                {/* {qaStats} % */}
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#c43323",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  ADMIN
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />
                {/* {adminStats} % */}
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#b5872b",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  INTERN
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />
                {/* {internStats} % */}
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#9620db",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  UI/ UX
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />
                {/* {designStats} % */}
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#eb7b3d",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  EXECUTIVE
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />
                {/* {managementStats} % */}
              </p>
              <PieChart
                className="col-md-4"
                size={220}
                // innerHoleSize={110}
                // data={
                //   [
                //     //   { key: "DEV", value: devStats, color: "#3566ba" },
                //     //   { key: "QA", value: qaStats, color: "#5db84e" },
                //     //   { key: "ADMIN", value: adminStats, color: "#c43323" },
                //     //   { key: "INTERN", value: internStats, color: "#b5872b" },
                //     //   { key: "DESIGN", value: designStats, color: "#9620db" },
                //     //   {
                //     //     key: "MANAGEMENT",
                //     //     value: managementStats,
                //     //     color: "#eb7b3d"
                //     //   }
                //   ]
                // }
                // styles={{
                //   ".chart_text": {
                //     fontSize: "2em",
                //     fontFamily: "serif",
                //     fontWeight: "bold",
                //     fill: "#00000",
                //   },
                // }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
